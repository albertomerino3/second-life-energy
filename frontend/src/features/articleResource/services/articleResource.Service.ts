import { apiFetch } from '../../../services/api'

import type { ArticleResource, ArticleResourcePayload } from '../types/articleResource'

// Tabla intermedia con clave compuesta (articleId + resourceId): no tiene update en el backend.
export const articleResourceService = {
    getAll: () => apiFetch<ArticleResource[]>('/article-resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    getById: (articleId: number, resourceId: number) => apiFetch<ArticleResource>(`/article-resources/${articleId}/${resourceId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleResourcePayload) => apiFetch<ArticleResource>('/article-resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    remove: (articleId: number, resourceId: number) => apiFetch<void>(`/article-resources/${articleId}/${resourceId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
