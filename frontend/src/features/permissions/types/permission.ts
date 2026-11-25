export interface PermissionRoleSummary {
    id: number
    name: string
}

export interface Permission {
    id: number
    code: string
    description: string | null
    roles?: PermissionRoleSummary[]
}

export interface PermissionPayload {
    code: string
    description?: string | null
}

export type PermissionUpdatePayload = Partial<PermissionPayload>
