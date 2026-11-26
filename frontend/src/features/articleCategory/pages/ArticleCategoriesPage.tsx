import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { useArticleCategories } from '../hooks/useArticleCategories'
import { articleCategoryService } from '../services/articleCategory.Service'
import type { ArticleCategory } from '../types/articleCategory'

function CategoryDialog({ category, categories, remove, onClose, onSaved }: {
    category: ArticleCategory | null; categories: ArticleCategory[]; remove: boolean; onClose: () => void; onSaved: () => Promise<void>
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const title = useId()
    const [name, setName] = useState(category?.name ?? '')
    const [description, setDescription] = useState(category?.description ?? '')
    const [parentCategoryId, setParentCategoryId] = useState(category?.parentCategoryId ? String(category.parentCategoryId) : '')
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
        if (!remove && (!name.trim() || name.trim().length > 100 || description.trim().length > 255)) {
            setError('Enter a name between 1 and 100 characters and a description up to 255.')
            return
        }
        submitting.current = true
        setBusy(true)
        setError('')
        const payload = {
            name: name.trim(),
            description: description.trim() || null,
            parentCategoryId: parentCategoryId ? Number(parentCategoryId) : null,
        }
        try {
            if (remove && category) await articleCategoryService.remove(category.id)
            else if (category) await articleCategoryService.update(category.id, payload)
            else await articleCategoryService.create(payload)
        } catch {
            setError(remove ? 'Could not delete the category. Check that it has no articles or subcategories.' : 'Could not save the category. Check that the name is unique and try again.')
            submitting.current = false
            setBusy(false)
            return
        }
        await onSaved()
        onClose()
    }
    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'
    return <dialog ref={dialog} aria-labelledby={title} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={title} className="mb-4 text-xl font-bold">{remove ? 'Delete category' : category ? 'Edit category' : 'New category'}</h2>
        <form onSubmit={submit} className="space-y-4">
            {remove ? <p>Do you want to delete the category <strong>{category?.name}</strong>? This action cannot be undone.</p> : <>
                <label className="block">Name
                    <input autoFocus required maxLength={100} pattern=".*\S.*" value={name} disabled={busy}
                        onChange={event => setName(event.target.value)} className={inputClass} />
                </label>
                <label className="block">Description (optional)
                    <textarea rows={3} maxLength={255} value={description} disabled={busy}
                        onChange={event => setDescription(event.target.value)} className={inputClass} />
                </label>
                <label className="block">Parent category (optional)
                    <select value={parentCategoryId} disabled={busy}
                        onChange={event => setParentCategoryId(event.target.value)} className={inputClass}>
                        <option value="">None</option>
                        {/* Una categoría no puede ser su propio padre: el backend lo rechaza. */}
                        {categories.filter(item => item.id !== category?.id).map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                </label>
            </>}
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button autoFocus={remove} type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2">Cancel</Button>
                <Button type="submit" variant={remove ? 'danger' : 'primary'} disabled={busy} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Processing...' : remove ? 'Delete' : category ? 'Save changes' : 'Create category'}
                </Button>
            </div>
        </form>
    </dialog>
}

export default function ArticleCategoriesPage() {
    const { categories, loading, error, reload } = useArticleCategories()
    const [dialog, setDialog] = useState<{ category: ArticleCategory | null; remove: boolean } | null>(null)
    const names = new Map(categories.map(category => [category.id, category.name]))
    return <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Category list</h1>
            <Button disabled={loading} onClick={() => setDialog({ category: null, remove: false })} className="rounded px-4 py-2">New category</Button>
        </div>
        {error && <div className="mb-4"><p role="alert" className="text-red-600">{error}</p><Button onClick={() => void reload()} disabled={loading} variant="secondary" className="mt-2 rounded px-4 py-2">Reload</Button></div>}
        {loading ? <p role="status">Loading categories...</p> : !error && categories.length === 0 ? <p>No categories available. Create one to add articles.</p> :
            <ul aria-label="Category list" className="space-y-3">
                {categories.map(category => <li key={category.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="min-w-0">
                        <p className="font-semibold [overflow-wrap:anywhere]">{category.name}</p>
                        {category.parentCategoryId && <p className="text-sm text-gray-600">Parent: {names.get(category.parentCategoryId) ?? 'Unknown category'}</p>}
                        {category.description && <p className="text-sm text-gray-600 [overflow-wrap:anywhere]">{category.description}</p>}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" aria-label={`Edit ${category.name}`} onClick={() => setDialog({ category, remove: false })} className="rounded px-3 py-2">Edit</Button>
                        <Button variant="danger" aria-label={`Delete ${category.name}`} onClick={() => setDialog({ category, remove: true })} className="rounded px-3 py-2">Delete</Button>
                    </div>
                </li>)}
            </ul>}
        {dialog && <CategoryDialog {...dialog} categories={categories} onClose={() => setDialog(null)} onSaved={reload} />}
    </main>
}
