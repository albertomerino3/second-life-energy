import { apiFetch } from '../../../services/api'

export interface Role { id: number; name: string; description: string | null }
export interface RolePayload { name: string; description: string | null }

export const roleService = {

    getAll: () => apiFetch<Role[]>('/roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (payload: RolePayload) => apiFetch<Role>('/roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload)
    }),

    update: (id: number, payload: RolePayload) => apiFetch<Role>(`/roles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(payload)
    }),

    remove: (id: number) => apiFetch<void>(`/roles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}
