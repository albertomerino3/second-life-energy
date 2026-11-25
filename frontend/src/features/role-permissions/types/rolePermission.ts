export interface RolePermissionRoleSummary {
    id: number
    name: string
}

export interface RolePermissionPermissionSummary {
    id: number
    code: string
}

export interface RolePermission {
    roleId: number
    permissionId: number
    role?: RolePermissionRoleSummary
    permission?: RolePermissionPermissionSummary
}

export interface RolePermissionPayload {
    roleId: number
    permissionId: number
}

export interface RolePermissionFilters {
    roleId?: number
    permissionId?: number
}
