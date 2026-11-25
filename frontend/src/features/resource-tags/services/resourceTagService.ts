import { apiFetch } from '../../../services/api'
import type { ResourceTag, ResourceTagPayload } from '../types/resourceTag'

export const resourceTagService = {
    getAll: () => apiFetch<ResourceTag[]>('/resource-tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: ResourceTagPayload) => apiFetch<ResourceTag>('/resource-tags', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    remove: (resourceId: number, tagId: number) => apiFetch<void>(`/resource-tags/${resourceId}/${tagId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}