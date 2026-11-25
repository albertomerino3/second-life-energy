import { useCallback, useEffect, useMemo, useState } from 'react'
import { auditLogService } from '../services/auditLogService'
import type { AuditLogFilters, AuditLogPage } from '../types/auditLog.js'

export const PAGE_SIZE = 20

const EMPTY_PAGE: AuditLogPage = { items: [], total: 0 }

export function useAuditLogs(filters: AuditLogFilters, page: number) {
    const [reloadKey, setReloadKey] = useState(0)
    // Cada combinación de filtros/página/recarga es una "petición" con identidad propia.
    const request = useMemo(() => ({ filters, page, reloadKey }), [filters, page, reloadKey])
    const [result, setResult] = useState<{ request: typeof request; data?: AuditLogPage } | null>(null)

    useEffect(() => {
        let active = true
        auditLogService.getAll({ ...request.filters, page: request.page, limit: PAGE_SIZE })
            .then(data => { if (active) setResult({ request, data }) })
            .catch(() => { if (active) setResult({ request }) })
        return () => { active = false }
    }, [request])

    const reload = useCallback(() => setReloadKey(key => key + 1), [])
    const loading = result?.request !== request
    const failed = !loading && !result?.data

    return {
        items: result?.data?.items ?? EMPTY_PAGE.items,
        total: result?.data?.total ?? EMPTY_PAGE.total,
        loading,
        error: failed ? 'Could not load the audit logs.' : '',
        reload,
    }
}