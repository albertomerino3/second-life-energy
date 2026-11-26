import { apiFetch } from '../../../services/api'

import type { ArticleReview, ArticleReviewPayload } from '../types/articleReview'

export const articleReviewService = {
    getAll: () => apiFetch<ArticleReview[]>('/article-reviews', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    getById: (id: number) => apiFetch<ArticleReview>(`/article-reviews/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleReviewPayload) => apiFetch<ArticleReview>('/article-reviews', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: ArticleReviewPayload) => apiFetch<ArticleReview>(`/article-reviews/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/article-reviews/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
