import { useCallback, useEffect, useState } from 'react'
import { articleCategoryService } from '../services/articleCategory.Service'
import type { ArticleCategory } from '../types/articleCategory'

export function useArticleCategories() {
    const [categories, setCategories] = useState<ArticleCategory[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setCategories(await articleCategoryService.getAll()) }
        catch { setError('Could not load categories.') }
        finally { setLoading(false) }
    }, [])
    useEffect(() => {
        let active = true
        void articleCategoryService.getAll().then(data => {
            if (active) setCategories(data)
        }).catch(() => {
            if (active) setError('Could not load categories.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])
    return { categories, loading, error, reload }
}
