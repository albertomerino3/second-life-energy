import { apiFetch } from "../../../services/api"
import type {
    RolePermission,
    RolePermissionFilters,
    RolePermissionPayload,
} from "../types/rolePermission"

function buildQuery(filters: RolePermissionFilters = {}): string {
    const params = new URLSearchParams()
    if (filters.roleId !== undefined) params.set("roleId", String(filters.roleId))
    if (filters.permissionId !== undefined) params.set("permissionId", String(filters.permissionId))
    const query = params.toString()
    return query ? `?${query}` : ""
}

export const rolePermissionService = {
    getAll: (filters: RolePermissionFilters = {}) =>
        apiFetch<RolePermission[]>(`/role-permissions${buildQuery(filters)}`),

    getByRoleId: (roleId: number) =>
        apiFetch<RolePermission[]>(`/role-permissions/role/${roleId}`),

    getById: (roleId: number, permissionId: number) =>
        apiFetch<RolePermission>(`/role-permissions/${roleId}/${permissionId}`),

    assign: (payload: RolePermissionPayload) =>
        apiFetch<RolePermission>("/role-permissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }),

    revoke: (roleId: number, permissionId: number) =>
        apiFetch<void>(`/role-permissions/${roleId}/${permissionId}`, {
            method: "DELETE",
        }),
}
