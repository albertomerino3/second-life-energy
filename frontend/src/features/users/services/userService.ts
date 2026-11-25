import { apiFetch } from '../../../services/api'
import type { User, UserPayload } from '../types/user.js'

const json = { 'Content-Type': 'application/json' }

export const userService = {
    getAll: () => apiFetch<User[]>('/users', { method: 'GET' }),

    getById: (id: number) => apiFetch<User>(`/users/${id}`, { method: 'GET' }),

    create: (payload: UserPayload) => apiFetch<User>('/users', {
        headers: json,
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: UserPayload) => apiFetch<User>(`/users/${id}`, {
        headers: json,
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/users/${id}`, { method: 'DELETE' }),
}
