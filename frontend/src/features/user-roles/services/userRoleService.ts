import { apiFetch } from '../../../services/api'
import type { UserRole, UserRolePayload } from '../types/userRole'

export const userRoleService = {
    getAll: () => apiFetch<UserRole[]>('/user-roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: UserRolePayload) => apiFetch<UserRole>('/user-roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    remove: (userId: number, roleId: number) => apiFetch<void>(`/user-roles/${userId}/${roleId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}