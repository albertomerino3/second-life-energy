import { apiFetch } from '../../../services/api'
//import { articleService } from '../../requests/services/articleService'
//import { resourceService } from '../../requests/services/resourceService'

import type { ArticleResource, ArticleResourcePayload, } from '../types/articleResource'

function toFormData(payload: ArticleResourcePayload) {
    const form = new FormData()
    form.set('articleId', String(payload.articleId))
    form.set('resourceId', String(payload.resourceId))
    return form
}

export const articleResourceService = {
    getAll: async () => {
        const [articleResources,
            //articleIds, resourceIds
        ] = await Promise.all([
            apiFetch<ArticleResource[]>('/request-items', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            //parentCategoryService.getAll()
            //articleService.getAll(), resourceService.getAll()
        ]);

        //const names = new Map(brands.map(brand => [brand.id, brand.name]))

        return articleResources.map(articleResource => ({ ...articleResource,
            //brand: names.get(articleresource.brandId) ?? 'Unknown brand' 
        }))
        //return articleresources.map(articleresource => ({ ...articleresource, brand: names.get(articleresource.brandId) ?? 'Unknown brand' }))

    },

    getById: (id: number) => apiFetch<ArticleResource>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: ArticleResourcePayload) => apiFetch<ArticleResource>('/request-items', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: ArticleResourcePayload) => apiFetch<ArticleResource>(`/request-items/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
