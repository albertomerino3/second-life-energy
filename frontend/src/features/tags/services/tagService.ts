import { apiFetch } from '../../../services/api'
import type { Tag, TagPayload } from '../types/tag'

export const tagService = {
    getAll: () => apiFetch<Tag[]>('/tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: TagPayload) => apiFetch<Tag>('/tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (id: number, data: TagPayload) => apiFetch<Tag>(`/tags/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data)
    }),

    remove: (id: number) => apiFetch<void>(`/tags/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}