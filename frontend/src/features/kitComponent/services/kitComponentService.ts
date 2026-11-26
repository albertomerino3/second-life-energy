import { apiFetch } from '../../../services/api'

import type { KitComponent, KitComponentPayload } from '../types/kitComponent'

// Tabla intermedia con clave compuesta (kitId + componentId): las rutas llevan los dos ids.
export const kitComponentService = {
    getAll: () => apiFetch<KitComponent[]>('/kit-components', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    getById: (kitId: number, componentId: number) => apiFetch<KitComponent>(`/kit-components/${kitId}/${componentId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: KitComponentPayload) => apiFetch<KitComponent>('/kit-components', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (kitId: number, componentId: number, quantity: number) => apiFetch<KitComponent>(`/kit-components/${kitId}/${componentId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ quantity }),
    }),

    remove: (kitId: number, componentId: number) => apiFetch<void>(`/kit-components/${kitId}/${componentId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
