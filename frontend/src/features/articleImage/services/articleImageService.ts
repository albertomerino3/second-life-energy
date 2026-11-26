import { apiFetch } from '../../../services/api'

import type { ArticleImage, ArticleImagePayload } from '../types/articleImage'

export const articleImageService = {
    getAll: () => apiFetch<ArticleImage[]>('/article-images', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    getById: (id: number) => apiFetch<ArticleImage>(`/article-images/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleImagePayload) => apiFetch<ArticleImage>('/article-images', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: ArticleImagePayload) => apiFetch<ArticleImage>(`/article-images/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/article-images/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
