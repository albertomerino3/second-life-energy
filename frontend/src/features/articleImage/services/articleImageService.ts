import { apiFetch } from '../../../services/api'
//import { articleService } from '../../requests/services/articleService'

import type { ArticleImage, ArticleImagePayload, } from '../types/articleImage'

function toFormData(payload: ArticleImagePayload) {
    const form = new FormData()
    form.set('articleId', String(payload.articleId))
    form.set('url', String(payload.url))
    form.set('altText', String(payload.altText))
    form.set('sortOrder',  String(payload.sortOrder))
    return form
}

export const articleImageService = {
    getAll: async () => {
        const [articleImages,
            //articleIds
        ] = await Promise.all([
            apiFetch<ArticleImage[]>('/request-items', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            //articleService.getAll()
        ]);

        //const names = new Map(brands.map(brand => [brand.id, brand.name]))

        return articleImages.map(articleImage => ({ ...articleImage,
            //brand: names.get(articleimage.brandId) ?? 'Unknown brand' 
        }))
        //return articleresources.map(articleimage => ({ ...articleimage, brand: names.get(articleimage.brandId) ?? 'Unknown brand' }))

    },

    getById: (id: number) => apiFetch<ArticleImage>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleImagePayload) => apiFetch<ArticleImage>('/request-items', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: ArticleImagePayload) => apiFetch<ArticleImage>(`/request-items/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
