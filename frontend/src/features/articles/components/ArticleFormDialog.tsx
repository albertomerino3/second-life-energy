import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { ARTICLE_TYPES } from '../types/article.js'
import type { ArticleListItem, ArticlePayload, CategoryOption } from '../types/article.js'

export default function ArticleFormDialog({ article, categories, onSubmit, onClose }: {
    article: ArticleListItem | null
    categories: CategoryOption[]
    onSubmit: (payload: ArticlePayload) => Promise<void>
    onClose: () => void
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const heading = useId()
    const submitting = useRef(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState(() => ({
        categoryId: article ? String(article.categoryId) : '',
        name: article?.name ?? '',
        description: article?.description ?? '',
        type: article?.type ?? '',
        specifications: article?.specifications ?? '',
        stock: String(article?.stock ?? 0),
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

        const type = ARTICLE_TYPES.find(item => item === values.type)
        const categoryId = Number(values.categoryId)
        const name = values.name.trim()
        const description = values.description.trim()
        const stock = Number(values.stock)

        if (!categories.some(category => category.id === categoryId) || !name || name.length > 150
            || !description || !type || !values.stock.trim() || !Number.isInteger(stock) || stock < 0) {
            setError('Check the category, name, description, type, and stock.')
            return
        }

        submitting.current = true
        setBusy(true)
        setError('')
        try {
            await onSubmit({ categoryId, name, description, type, specifications: values.specifications.trim() || null, stock })
            onClose()
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : 'Could not save the article. Please try again.')
            submitting.current = false
            setBusy(false)
        }
    }

    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

    return <dialog ref={dialog} aria-labelledby={heading} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={heading} className="mb-4 text-xl font-bold">{article ? 'Edit article' : 'New article'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            {categories.length === 0 && <p role="status">No categories available. Create one in the Categories section before saving an article.</p>}
            <fieldset disabled={busy || categories.length === 0} className="space-y-4 disabled:opacity-60">
                <label className="block">
                    Category
                    <select autoFocus name="categoryId" required className={inputClass} value={values.categoryId}
                        onChange={event => change('categoryId', event.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                </label>
                <label className="block">
                    Name
                    <input name="name" required maxLength={150} pattern=".*\S.*"
                        className={inputClass} value={values.name}
                        onChange={event => change('name', event.target.value)} />
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
                        {ARTICLE_TYPES.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
                <label className="block">
                    Specifications (optional)
                    <textarea name="specifications" rows={3}
                        className={inputClass} value={values.specifications}
                        onChange={event => change('specifications', event.target.value)} />
                </label>
                <label className="block">
                    Stock
                    <input name="stock" type="number" required min="0" step="1"
                        className={inputClass} value={values.stock}
                        onChange={event => change('stock', event.target.value)} />
                </label>
            </fieldset>
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2 disabled:opacity-50">Cancel</Button>
                <Button type="submit" disabled={busy || categories.length === 0} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Saving...' : article ? 'Save changes' : 'Create article'}
                </Button>
            </div>
        </form>
    </dialog>
}
