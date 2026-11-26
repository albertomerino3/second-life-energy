import { apiFetch } from '../../../services/api'

import type { RequestItem, RequestItemPayload } from '../types/requestItem'

export const requestItemService = {
    getAll: () => apiFetch<RequestItem[]>('/request-items', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    getById: (id: number) => apiFetch<RequestItem>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: RequestItemPayload) => apiFetch<RequestItem>('/request-items', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: RequestItemPayload) => apiFetch<RequestItem>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
