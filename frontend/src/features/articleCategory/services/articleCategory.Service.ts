import { apiFetch } from '../../../services/api'
//import { parentCategoryService } from '../../requests/services/parentCategoryService'

import type { ArticleCategory, ArticleCategoryPayload, } from '../types/articleCategory'

function toFormData(payload: ArticleCategoryPayload) {
    const form = new FormData()
    form.set('name', String(payload.name))
    form.set('description', String(payload.description))
    form.set('parentCategoryId', String(payload.parentCategoryId))
    return form
}

export const articleCategoryService = {
    getAll: async () => {
        const [articleCategorys,
            //parentCategories
        ] = await Promise.all([
            apiFetch<ArticleCategory[]>('/request-items', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            //parentCategoryService.getAll()
        ]);

        //const names = new Map(brands.map(brand => [brand.id, brand.name]))

        return articleCategorys.map(articleCategory => ({ ...articleCategory,
            //brand: names.get(articlecategory.brandId) ?? 'Unknown brand' 
        }))
        //return articlecategorys.map(articlecategory => ({ ...articlecategory, brand: names.get(articlecategory.brandId) ?? 'Unknown brand' }))

    },

    getById: (id: number) => apiFetch<ArticleCategory>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleCategoryPayload) => apiFetch<ArticleCategory>('/request-items', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: ArticleCategoryPayload) => apiFetch<ArticleCategory>(`/request-items/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
