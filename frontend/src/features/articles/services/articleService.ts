import { apiFetch } from '../../../services/api'
import type { Article, ArticlePayload } from '../types/article.js'

const json = { 'Content-Type': 'application/json' }

export const articleService = {
    getAll: () => apiFetch<Article[]>('/articles', { method: 'GET' }),

    getById: (id: number) => apiFetch<Article>(`/articles/${id}`, { method: 'GET' }),

    create: (payload: ArticlePayload) => apiFetch<Article>('/articles', {
        headers: json,
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: ArticlePayload) => apiFetch<Article>(`/articles/${id}`, {
        headers: json,
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/articles/${id}`, { method: 'DELETE' }),
}