import { useCallback, useEffect, useState } from 'react'
import { tagService } from '../services/tagService'
import type { Tag } from '../types/tag'

export function useTags() {
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setTags(await tagService.getAll()) }
        catch { setError('Could not load tags.') }
        finally { setLoading(false) }
    }, [])

    useEffect(() => {
        let active = true
        void tagService.getAll().then(data => {
            if (active) setTags(data)
        }).catch(() => {
            if (active) setError('Could not load tags.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])

    return { tags, loading, error, reload }
}