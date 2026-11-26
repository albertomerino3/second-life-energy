import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { SIMULATION_PLATFORMS } from '../types/simulation.js'
import type { Simulation, SimulationPayload } from '../types/simulation.js'

export default function SimulationFormDialog({ simulation, onSave, onClose }: {
    simulation: Simulation | null
    onSave: (payload: SimulationPayload) => Promise<void>
    onClose: () => void
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const heading = useId()
    const submitting = useRef(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState(() => ({
        title: simulation?.title ?? '',
        description: simulation?.description ?? '',
        platform: simulation?.platform ?? '',
        url: simulation?.url ?? '',
        objectives: simulation?.objectives ?? '',
        materials: simulation?.materials ?? '',
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
        const platform = SIMULATION_PLATFORMS.find(item => item === values.platform)
        const title = values.title.trim()
        const description = values.description.trim()
        const url = values.url.trim()
        const objectives = values.objectives.trim()
        const materials = values.materials.trim()

        if (!title || !description || !platform || !url || !objectives || !materials
            || title.length > 150 || url.length > 500 || !/^https?:\/\//i.test(url)) {
            setError('Check the title, description, platform, URL (http or https), objectives, and materials.')
            return
        }

        submitting.current = true
        setBusy(true)
        setError('')
        try {
            await onSave({ title, description, platform, url, objectives, materials })
            onClose()
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : 'Could not save the simulation. Please try again.')
            submitting.current = false
            setBusy(false)
        }
    }

    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

    return <dialog ref={dialog} aria-labelledby={heading} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={heading} className="mb-4 text-xl font-bold">{simulation ? 'Edit simulation' : 'New simulation'}</h2>
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
                    Platform
                    <select name="platform" required className={`${inputClass} capitalize`} value={values.platform}
                        onChange={event => change('platform', event.target.value)}>
                        <option value="">Select a platform</option>
                        {SIMULATION_PLATFORMS.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
                <label className="block">
                    URL
                    <input name="url" type="url" required maxLength={500} pattern="https?://.+"
                        className={inputClass} value={values.url}
                        onChange={event => change('url', event.target.value)} />
                </label>
                <label className="block">
                    Objectives
                    <textarea name="objectives" required rows={3}
                        className={inputClass} value={values.objectives}
                        onChange={event => change('objectives', event.target.value)} />
                </label>
                <label className="block">
                    Materials
                    <textarea name="materials" required rows={3}
                        className={inputClass} value={values.materials}
                        onChange={event => change('materials', event.target.value)} />
                </label>
            </fieldset>
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2 disabled:opacity-50">Cancel</Button>
                <Button type="submit" disabled={busy} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Saving...' : simulation ? 'Save changes' : 'Create simulation'}
                </Button>
            </div>
        </form>
    </dialog>
}
