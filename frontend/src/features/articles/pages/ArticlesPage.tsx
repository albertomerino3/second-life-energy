import { useState } from 'react'
import Button from '../../../components/ui/Button'
import ArticleDeleteDialog from '../components/ArticleDeleteDialog'
import ArticleFormDialog from '../components/ArticleFormDialog'
import ArticleList from '../components/ArticleList'
import { useArticles } from '../hooks/useArticles'
import type { ArticleListItem } from '../types/article'

type DialogState =
    | { mode: 'form'; article: ArticleListItem | null }
    | { mode: 'delete'; article: ArticleListItem }
    | null

export default function ArticlesPage() {
    const { articles, categories, loading, error, reload, saveArticle, deleteArticle } = useArticles()
    const [dialog, setDialog] = useState<DialogState>(null)
    const close = () => setDialog(null)

    return <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-bold">Articles</h1>
            <Button onClick={() => setDialog({ mode: 'form', article: null })} className="rounded px-4 py-2">New article</Button>
        </div>
        {error && <div className="mb-4">
            <p role="alert" className="text-red-600">{error}</p>
            <Button variant="secondary" onClick={() => void reload()} className="mt-2 rounded px-4 py-2">Reload</Button>
        </div>}
        {loading ? <p role="status">Loading articles...</p> :
            !error && articles.length === 0 ? <p>No articles yet. Create one to get started.</p> :
                articles.length > 0 && <ArticleList
                    articles={articles}
                    onEdit={article => setDialog({ mode: 'form', article })}
                    onDelete={article => setDialog({ mode: 'delete', article })} />}
        {dialog?.mode === 'form' && <ArticleFormDialog
            key={dialog.article?.id ?? 'new'}
            article={dialog.article}
            categories={categories}
            onSubmit={payload => saveArticle(dialog.article?.id ?? null, payload)}
            onClose={close} />}
        {dialog?.mode === 'delete' && <ArticleDeleteDialog
            article={dialog.article}
            onConfirm={() => deleteArticle(dialog.article.id)}
            onClose={close} />}
    </main>
}