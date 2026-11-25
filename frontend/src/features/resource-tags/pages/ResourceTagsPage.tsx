import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { useResourceTags } from '../hooks/useResourceTags'
import { resourceTagService } from '../services/resourceTagService'
import type { ResourceTag } from '../types/resourceTag'

function ResourceTagDialog({ remove, onClose, onSaved }: {
    remove: boolean; onClose: () => void; onSaved: () => Promise<void>
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const title = useId()
    const [resourceId, setResourceId] = useState<number>(0)
    const [tagId, setTagId] = useState<number>(0)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const submitting = useRef(false)

    useEffect(() => {
        const element = dialog.current
        element?.showModal()
        return () => element?.close()
    }, [])

    async function submit(event: FormEvent) {
        event.preventDefault()
        if (submitting.current) return
        if (!remove && (resourceId <= 0 || tagId <= 0)) {
            setError('Enter valid Resource ID and Tag ID.')
            return
        }
        submitting.current = true
        setBusy(true)
        setError('')
        try {
            if (remove) {
                // No implementado sin selección específica
            } else {
                await resourceTagService.create({ resourceId, tagId })
            }
        } catch {
            setError('Could not save the resource tag. It may already exist.')
            submitting.current = false
            setBusy(false)
            return
        }
        await onSaved()
        onClose()
    }

    return <dialog ref={dialog} aria-labelledby={title} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={title} className="mb-4 text-xl font-bold">{remove ? 'Delete resource tag' : 'New resource tag'}</h2>
        <form onSubmit={submit} className="space-y-4">
            {remove ? <p>Select a relationship to delete from the list.</p> :
                <>
                    <label className="block">Resource ID
                        <input type="number" required min={1} value={resourceId || ''} disabled={busy}
                            onChange={event => setResourceId(Number(event.target.value))} className="mt-1 w-full rounded border border-gray-300 p-2" />
                    </label>
                    <label className="block">Tag ID
                        <input type="number" required min={1} value={tagId || ''} disabled={busy}
                            onChange={event => setTagId(Number(event.target.value))} className="mt-1 w-full rounded border border-gray-300 p-2" />
                    </label>
                </>}
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button autoFocus={remove} type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2">Cancel</Button>
                <Button type="submit" variant={remove ? 'danger' : 'primary'} disabled={busy} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Processing...' : remove ? 'Delete' : 'Create relationship'}
                </Button>
            </div>
        </form>
    </dialog>
}

export default function ResourceTagsPage() {
    const { resourceTags, loading, error, reload } = useResourceTags()
    const [dialog, setDialog] = useState<{ remove: boolean } | null>(null)

    return <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Resource-Tag relationships</h1>
            <Button disabled={loading} onClick={() => setDialog({ remove: false })} className="rounded px-4 py-2">New relationship</Button>
        </div>
        {error && <div className="mb-4"><p role="alert" className="text-red-600">{error}</p><Button onClick={() => void reload()} disabled={loading} variant="secondary" className="mt-2 rounded px-4 py-2">Reload</Button></div>}
        {loading ? <p role="status">Loading relationships...</p> : !error && resourceTags.length === 0 ? <p>No resource-tag relationships available.</p> :
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-left">Resource ID</th>
                        <th className="px-4 py-2 text-left">Tag ID</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resourceTags.map(rt => <tr key={`${rt.resourceId}-${rt.tagId}`} className="border-b border-gray-100">
                        <td className="px-4 py-2">{rt.resourceId}</td>
                        <td className="px-4 py-2">{rt.tagId}</td>
                        <td className="px-4 py-2 text-right">
                            <Button variant="danger" onClick={() => { void resourceTagService.remove(rt.resourceId, rt.tagId).then(reload).catch(() => {}) }} className="rounded px-3 py-2">Delete</Button>
                        </td>
                    </tr>)}
                </tbody>
            </table>}
        {dialog && <ResourceTagDialog {...dialog} onClose={() => setDialog(null)} onSaved={reload} />}
    </main>
}