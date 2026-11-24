import { apiFetch } from '../../../services/api'
//import { requestService } from '../../requests/services/requestService'
//import { articleService } from '../../articles/services/articleService'


import type { RequestItem, RequestItemPayload, } from '../types/requestItem'

function toFormData(payload: RequestItemPayload) {
    const form = new FormData()
    form.set('requestId', String(payload.requestId))
    form.set('articleId', String(payload.articleId))
    form.set('quantity', String(payload.quantity))
    return form
}

export const requestItemService = {
    getAll: async () => {
        const [requestItems,
            //requests, articles
        ] = await Promise.all([
            apiFetch<RequestItem[]>('/request-items', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            //requestService.getAll(),
            //articleService.getAll()
        ]);

        //const names = new Map(brands.map(brand => [brand.id, brand.name]))

        return requestItems.map(requestItem => ({ ...requestItem,
            //brand: names.get(requestitem.brandId) ?? 'Unknown brand' 
        }))
        //return requestitems.map(requestitem => ({ ...requestitem, brand: names.get(requestitem.brandId) ?? 'Unknown brand' }))

    },

    getById: (id: number) => apiFetch<RequestItem>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: RequestItemPayload) => apiFetch<RequestItem>('/request-items', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: RequestItemPayload) => apiFetch<RequestItem>(`/request-items/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
