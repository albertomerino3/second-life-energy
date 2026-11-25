import { useCallback, useEffect, useState } from 'react'
import { simulationArticleService } from '../services/simulationArticleService'
import type { SimulationArticle } from '../types/simulationArticle'

export function useSimulationArticles() {
    const [simulationArticles, setSimulationArticles] = useState<SimulationArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setSimulationArticles(await simulationArticleService.getAll()) }
        catch { setError('Could not load simulation articles.') }
        finally { setLoading(false) }
    }, [])

    useEffect(() => {
        let active = true
        void simulationArticleService.getAll().then(data => {
            if (active) setSimulationArticles(data)
        }).catch(() => {
            if (active) setError('Could not load simulation articles.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])

    return { simulationArticles, loading, error, reload }
}