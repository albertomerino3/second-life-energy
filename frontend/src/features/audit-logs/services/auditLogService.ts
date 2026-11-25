import { apiFetch } from '../../../services/api'
import type { AuditLog, AuditLogPage, AuditLogQuery } from '../types/auditLog.js'

// Los registros de auditoría son inmutables: el front solo los consulta.
export const auditLogService = {
    getAll: ({ page, limit, ...filters }: AuditLogQuery) => {
        const query = new URLSearchParams({ page: String(page), limit: String(limit) })
        for (const [key, value] of Object.entries(filters)) {
            if (value.trim()) query.set(key, value.trim())
        }
        return apiFetch<AuditLogPage>(`/audit-logs?${query}`, { method: 'GET' })
    },

    getById: (id: number) => apiFetch<AuditLog>(`/audit-logs/${id}`, { method: 'GET' }),
}