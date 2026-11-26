import { apiFetch } from '../../../services/api'
//import { articleService } from '../../requests/services/articleService'
//import { reviewerService } from '../../articles/services/reviewerService'


import type { ArticleReview, ArticleReviewPayload, } from '../types/articleReview'

function toFormData(payload: ArticleReviewPayload) {
    const form = new FormData()
    form.set('articleId', String(payload.articleId))
    form.set('reviewerId', String(payload.reviewerId))
    form.set('decision', String(payload.decision))
    form.set('comments', String(payload.comments))
    return form
}

export const articleReviewService = {
    getAll: async () => {
        const [articleReviews,
            //articles, reviewers
        ] = await Promise.all([
            apiFetch<ArticleReview[]>('/request-items', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            //article.getAll(),
            //reviewerService.getAll()
        ]);

        //const names = new Map(brands.map(brand => [brand.id, brand.name]))

        return articleReviews.map(articleReview => ({ ...articleReview,
            //brand: names.get(articlereview.brandId) ?? 'Unknown brand' 
        }))
        //return articlereviewers.map(articlereview => ({ ...articlereview, brand: names.get(articlereview.brandId) ?? 'Unknown brand' }))

    },

    getById: (id: number) => apiFetch<ArticleReview>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleReviewPayload) => apiFetch<ArticleReview>('/request-items', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: ArticleReviewPayload) => apiFetch<ArticleReview>(`/request-items/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
