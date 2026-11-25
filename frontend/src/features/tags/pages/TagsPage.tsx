import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { useTags } from '../hooks/useTags'
import { tagService } from '../services/tagService'
import type { Tag } from '../types/tag'

function TagDialog({ tag, remove, onClose, onSaved }: {
    tag: Tag | null; remove: boolean; onClose: () => void; onSaved: () => Promise<void>
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const title = useId()
    const [name, setName] = useState(tag?.name ?? '')
    const [slug, setSlug] = useState(tag?.slug ?? '')
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
        if (!remove && (!name.trim() || name.trim().length > 100)) {
            setError('Enter a name between 1 and 100 characters.')
            return
        }
        if (!remove && (!slug.trim() || slug.trim().length > 100)) {
            setError('Enter a slug between 1 and 100 characters.')
            return
        }
        submitting.current = true
        setBusy(true)
        setError('')
        try {
            if (remove && tag) await tagService.remove(tag.id)
            else if (tag) await tagService.update(tag.id, { name: name.trim(), slug: slug.trim() })
            else await tagService.create({ name: name.trim(), slug: slug.trim() })
        } catch {
            setError(remove ? 'Could not delete the tag.' : 'Could not save the tag. Check that the name and slug are unique and try again.')
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
        <h2 id={title} className="mb-4 text-xl font-bold">{remove ? 'Delete tag' : tag ? 'Edit tag' : 'New tag'}</h2>
        <form onSubmit={submit} className="space-y-4">
            {remove ? <p>Do you want to delete the tag <strong>{tag?.name}</strong> (slug: {tag?.slug})? This action cannot be undone.</p> :
                <>
                    <label className="block">Name
                        <input autoFocus required maxLength={100} pattern=".*\S.*" value={name} disabled={busy}
                            onChange={event => setName(event.target.value)} className="mt-1 w-full rounded border border-gray-300 p-2" />
                    </label>
                    <label className="block">Slug
                        <input required maxLength={100} pattern=".*\S.*" value={slug} disabled={busy}
                            onChange={event => setSlug(event.target.value)} className="mt-1 w-full rounded border border-gray-300 p-2" />
                    </label>
                </>}
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button autoFocus={remove} type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2">Cancel</Button>
                <Button type="submit" variant={remove ? 'danger' : 'primary'} disabled={busy} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Processing...' : remove ? 'Delete' : tag ? 'Save changes' : 'Create tag'}
                </Button>
            </div>
        </form>
    </dialog>
}

export default function TagsPage() {
    const { tags, loading, error, reload } = useTags()
    const [dialog, setDialog] = useState<{ tag: Tag | null; remove: boolean } | null>(null)

    return <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Tag list</h1>
            <Button disabled={loading} onClick={() => setDialog({ tag: null, remove: false })} className="rounded px-4 py-2">New tag</Button>
        </div>
        {error && <div className="mb-4"><p role="alert" className="text-red-600">{error}</p><Button onClick={() => void reload()} disabled={loading} variant="secondary" className="mt-2 rounded px-4 py-2">Reload</Button></div>}
        {loading ? <p role="status">Loading tags...</p> : !error && tags.length === 0 ? <p>No tags available. Create one to classify resources.</p> :
            <ul aria-label="Tag list" className="space-y-3">
                {tags.map(tag => <li key={tag.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <span className="min-w-0 font-semibold [overflow-wrap:anywhere]">{tag.name} <span className="text-sm font-normal text-gray-500">({tag.slug})</span></span>
                    <div className="flex gap-2">
                        <Button variant="secondary" aria-label={`Edit ${tag.name}`} onClick={() => setDialog({ tag, remove: false })} className="rounded px-3 py-2">Edit</Button>
                        <Button variant="danger" aria-label={`Delete ${tag.name}`} onClick={() => setDialog({ tag, remove: true })} className="rounded px-3 py-2">Delete</Button>
                    </div>
                </li>)}
            </ul>}
        {dialog && <TagDialog {...dialog} onClose={() => setDialog(null)} onSaved={reload} />}
    </main>
}