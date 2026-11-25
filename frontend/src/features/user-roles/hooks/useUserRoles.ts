import { useCallback, useEffect, useState } from 'react'
import { userRoleService } from '../services/userRoleService'
import type { UserRole } from '../types/userRole'

export function useUserRoles() {
    const [userRoles, setUserRoles] = useState<UserRole[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setUserRoles(await userRoleService.getAll()) }
        catch { setError('Could not load user roles.') }
        finally { setLoading(false) }
    }, [])

    useEffect(() => {
        let active = true
        void userRoleService.getAll().then(data => {
            if (active) setUserRoles(data)
        }).catch(() => {
            if (active) setError('Could not load user roles.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])

    return { userRoles, loading, error, reload }
}