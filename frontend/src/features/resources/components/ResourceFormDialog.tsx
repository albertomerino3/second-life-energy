import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { RESOURCE_DIFFICULTIES, RESOURCE_STATUSES, RESOURCE_TYPES } from '../types/resource.js'
import type { Resource, ResourcePayload } from '../types/resource.js'

export default function ResourceFormDialog({ resource, onSave, onClose }: {
    resource: Resource | null
    onSave: (payload: ResourcePayload) => Promise<void>
    onClose: () => void
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const heading = useId()
    const submitting = useRef(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState(() => ({
        title: resource?.title ?? '',
        description: resource?.description ?? '',
        type: resource?.type ?? '',
        topic: resource?.topic ?? '',
        difficulty: resource?.difficulty ?? '',
        url: resource?.url ?? '',
        status: resource?.status ?? 'draft',
    }))

    useEffect(() => {
        const element = dialog.current
        element?.showModal()
        return () => element?.close()
    }, [])

    function change(field: keyof typeof values, value: string) {
        setValues(previous => ({ ...previous, [field]: value }))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting.current) return

        // find() devuelve el valor ya tipado como unión (o undefined si no es válido), sin necesidad de `as`.
        const type = RESOURCE_TYPES.find(item => item === values.type)
        const difficulty = RESOURCE_DIFFICULTIES.find(item => item === values.difficulty)
        const status = RESOURCE_STATUSES.find(item => item === values.status)
        const title = values.title.trim()
        const description = values.description.trim()
        const topic = values.topic.trim()
        const url = values.url.trim()

        if (!title || !description || !topic || !url || !type || !difficulty || !status
            || title.length > 150 || topic.length > 100 || url.length > 500) {
            setError('Check the title, description, type, topic, difficulty, URL, and status.')
            return
        }

        submitting.current = true
        setBusy(true)
        setError('')
        try {
            await onSave({ title, description, type, topic, difficulty, url, status })
            onClose()
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : 'Could not save the resource. Please try again.')
            submitting.current = false
            setBusy(false)
        }
    }

    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

    return <dialog ref={dialog} aria-labelledby={heading} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={heading} className="mb-4 text-xl font-bold">{resource ? 'Edit resource' : 'New resource'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset disabled={busy} className="space-y-4 disabled:opacity-60">
                <label className="block">
                    Title
                    <input autoFocus name="title" required maxLength={150} pattern=".*\S.*"
                        className={inputClass} value={values.title}
                        onChange={event => change('title', event.target.value)} />
                </label>
                <label className="block">
                    Description
                    <textarea name="description" required rows={3}
                        className={inputClass} value={values.description}
                        onChange={event => change('description', event.target.value)} />
                </label>
                <label className="block">
                    Type
                    <select name="type" required className={`${inputClass} capitalize`} value={values.type}
                        onChange={event => change('type', event.target.value)}>
                        <option value="">Select a type</option>
                        {RESOURCE_TYPES.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
                <label className="block">
                    Topic
                    <input name="topic" required maxLength={100} pattern=".*\S.*"
                        className={inputClass} value={values.topic}
                        onChange={event => change('topic', event.target.value)} />
                </label>
                <label className="block">
                    Difficulty
                    <select name="difficulty" required className={`${inputClass} capitalize`} value={values.difficulty}
                        onChange={event => change('difficulty', event.target.value)}>
                        <option value="">Select a difficulty</option>
                        {RESOURCE_DIFFICULTIES.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
                <label className="block">
                    URL
                    <input name="url" type="url" required maxLength={500}
                        className={inputClass} value={values.url}
                        onChange={event => change('url', event.target.value)} />
                </label>
                <label className="block">
                    Status
                    <select name="status" required className={`${inputClass} capitalize`} value={values.status}
                        onChange={event => change('status', event.target.value)}>
                        {RESOURCE_STATUSES.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
            </fieldset>
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2 disabled:opacity-50">Cancel</Button>
                <Button type="submit" disabled={busy} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Saving...' : resource ? 'Save changes' : 'Create resource'}
                </Button>
            </div>
        </form>
    </dialog>
}
