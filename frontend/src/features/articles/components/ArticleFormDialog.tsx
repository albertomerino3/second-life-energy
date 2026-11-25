import { useEffect, useId, useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import type { ArticleListItem } from '../types/article.js'

export default function ArticleDeleteDialog({ article, onConfirm, onClose }: {
    article: ArticleListItem
    onConfirm: () => Promise<void>
    onClose: () => void
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const title = useId()
    const submitting = useRef(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const element = dialog.current
        element?.showModal()
        return () => element?.close()
    }, [])

    async function confirm() {
        if (submitting.current) return
        submitting.current = true
        setBusy(true)
        setError('')
        try {
            await onConfirm()
            onClose()
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : 'Could not delete the article.')
            submitting.current = false
            setBusy(false)
        }
    }

    return <dialog ref={dialog} aria-labelledby={title} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={title} className="mb-4 text-xl font-bold">Delete article</h2>
        <p>Do you want to delete <strong>{article.name}</strong>? This action cannot be undone.</p>
        {error && <p role="alert" className="mt-4 text-red-600">{error}</p>}
        <div className="mt-6 flex justify-end gap-2">
            <Button autoFocus type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2">Cancel</Button>
            <Button type="button" variant="danger" disabled={busy} onClick={() => void confirm()} className="rounded px-4 py-2 disabled:opacity-50">
                {busy ? 'Deleting...' : 'Delete'}
            </Button>
        </div>
    </dialog>
}