// Refleja el modelo del backend. Las fechas llegan como string ISO en el JSON.
export interface AuditLog {
    id: number
    userId: number | null
    entity: string
    entityId: number
    action: string
    previousValues: Record<string, unknown> | null
    newValues: Record<string, unknown> | null
    createdAt: string
}

export interface AuditLogFilters {
    entity: string
    action: string
    userId: string
    from: string
    to: string
}

export interface AuditLogQuery extends AuditLogFilters {
    page: number
    limit: number
}

export interface AuditLogPage {
    items: AuditLog[]
    total: number
}

export const EMPTY_FILTERS: AuditLogFilters = { entity: '', action: '', userId: '', from: '', to: '' }