import { apiFetch } from '../../../services/api'
//import { kitService } from '../../articles/services/kitService
//import { componentService } from '../../articles/services/componentService'


import type { KitComponent, KitComponentPayload, } from '../types/kitComponent'

function toFormData(payload: KitComponentPayload) {
    const form = new FormData()
    form.set('kitId', String(payload.kitId))
    form.set('componentId', String(payload.componentId))
    form.set('quantity', String(payload.quantity))
    return form
}

export const kitComponentService = {
    getAll: async () => {
        const [kitComponents,
            //kits, components
        ] = await Promise.all([
            apiFetch<KitComponent[]>('/request-items', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            //kitService.getAll(),
            //componentService.getAll()
        ]);

        //const names = new Map(brands.map(brand => [brand.id, brand.name]))

        return kitComponents.map(kitComponent => ({ ...kitComponent,
            //brand: names.get(kitcomponent.brandId) ?? 'Unknown brand' 
        }))
        //return kitcomponents.map(kitcomponent => ({ ...kitcomponent, brand: names.get(kitcomponent.brandId) ?? 'Unknown brand' }))

    },

    getById: (id: number) => apiFetch<KitComponent>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: KitComponentPayload) => apiFetch<KitComponent>('/request-items', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: KitComponentPayload) => apiFetch<KitComponent>(`/request-items/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/request-items/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
