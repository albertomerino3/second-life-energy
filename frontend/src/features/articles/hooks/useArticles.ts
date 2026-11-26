import { useCallback, useEffect, useMemo, useState } from 'react'
import { articleCategoryService } from '../../articleCategory/services/articleCategory.Service'
import { articleService } from '../services/articleService.js'
import type { Article, ArticleListItem, ArticlePayload, CategoryOption } from '../types/article.js'

export function useArticles() {
    const [rawArticles, setRawArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<CategoryOption[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        try {
            setError('')
            const [articles, categoryList] = await Promise.all([articleService.getAll(), articleCategoryService.getAll()])
            setRawArticles(articles)
            setCategories(categoryList)
        } catch {
            setError('Could not load articles.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { void load() }, [load])

    // Une cada artículo con el nombre de su categoría (la API solo devuelve categoryId).
    const articles = useMemo<ArticleListItem[]>(() => {
        const names = new Map(categories.map(category => [category.id, category.name]))
        return rawArticles.map(article => ({ ...article, categoryName: names.get(article.categoryId) ?? 'Unknown category' }))
    }, [rawArticles, categories])

    // Guardar y borrar lanzan el error: el diálogo que los llama lo muestra junto al formulario.
    async function saveArticle(id: number | null, payload: ArticlePayload) {
        if (id === null) await articleService.create(payload)
        else await articleService.update(id, payload)
        await load()
    }

    async function deleteArticle(id: number) {
        await articleService.remove(id)
        await load()
    }

    return { articles, categories, loading, error, reload: load, saveArticle, deleteArticle }
}