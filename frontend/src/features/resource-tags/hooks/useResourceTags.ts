import { useCallback, useEffect, useState } from 'react'
import { resourceTagService } from '../services/resourceTagService'
import type { ResourceTag } from '../types/resourceTag'

export function useResourceTags() {
    const [resourceTags, setResourceTags] = useState<ResourceTag[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setResourceTags(await resourceTagService.getAll()) }
        catch { setError('Could not load resource tags.') }
        finally { setLoading(false) }
    }, [])

    useEffect(() => {
        let active = true
        void resourceTagService.getAll().then(data => {
            if (active) setResourceTags(data)
        }).catch(() => {
            if (active) setError('Could not load resource tags.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])

    return { resourceTags, loading, error, reload }
}