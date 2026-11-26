import { useCallback, useEffect, useState } from 'react'
import { roleService } from '../services/roleService'
import type { Role } from '../services/roleService'

export function useRoles() {
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setRoles(await roleService.getAll()) }
        catch { setError('Could not load roles.') }
        finally { setLoading(false) }
    }, [])
    useEffect(() => {
        let active = true
        void roleService.getAll().then(data => {
            if (active) setRoles(data)
        }).catch(() => {
            if (active) setError('Could not load roles.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])
    return { roles, loading, error, reload }
}
