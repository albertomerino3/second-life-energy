import { apiFetch } from '../../../services/api'
import type { Resource, ResourcePayload } from '../types/resource.js'

const json = { 'Content-Type': 'application/json' }

export const resourceService = {
    getAll: () => apiFetch<Resource[]>('/resources', { method: 'GET' }),

    getById: (id: number) => apiFetch<Resource>(`/resources/${id}`, { method: 'GET' }),

    create: (payload: ResourcePayload) => apiFetch<Resource>('/resources', {
        headers: json,
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: ResourcePayload) => apiFetch<Resource>(`/resources/${id}`, {
        headers: json,
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/resources/${id}`, { method: 'DELETE' }),
}
