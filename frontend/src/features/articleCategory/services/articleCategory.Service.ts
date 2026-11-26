import { apiFetch } from '../../../services/api'

import type { ArticleCategory, ArticleCategoryPayload } from '../types/articleCategory'

export const articleCategoryService = {
    getAll: () => apiFetch<ArticleCategory[]>('/article-categories', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    getById: (id: number) => apiFetch<ArticleCategory>(`/article-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleCategoryPayload) => apiFetch<ArticleCategory>('/article-categories', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: ArticleCategoryPayload) => apiFetch<ArticleCategory>(`/article-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/article-categories/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
