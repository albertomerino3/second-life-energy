import { apiFetch } from '../../../services/api'
import type { User, UserPayload } from '../types/user.js'

// Igual que bicycleService: FormData para poder adjuntar la imagen (multer la recibe en el campo "image").
function toFormData(payload: UserPayload) {
    const form = new FormData()
    form.set('name', payload.name)
    form.set('email', payload.email)
    form.set('isActive', String(payload.isActive))
    if (payload.password) form.set('password', payload.password)
    if (payload.image) form.set('image', payload.image)
    return form
}

export const userService = {
    getAll: () => apiFetch<User[]>('/users', { method: 'GET' }),

    getById: (id: number) => apiFetch<User>(`/users/${id}`, { method: 'GET' }),

    create: (payload: UserPayload) => apiFetch<User>('/users', {
        method: 'POST',
        body: toFormData(payload),
    }),

    update: (id: number, payload: UserPayload) => apiFetch<User>(`/users/${id}`, {
        method: 'PUT',
        body: toFormData(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/users/${id}`, { method: 'DELETE' }),
}
