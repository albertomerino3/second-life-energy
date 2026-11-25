import { apiFetch } from '../../../services/api'
import { roleService } from '../../roles/services/roleService.js'

import type { Invitation, InvitationPayload } from '../types/invitation'

export const invitationService = {
    getAll: async () => {
        const [invitations, roles] = await Promise.all([
            apiFetch<Invitation[]>('/invitations', {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            }),
            roleService.getAll()]);

        const names = new Map(roles.map(role => [role.id, role.name]))
        return invitations.map(invitation => ({ ...invitation, role: names.get(invitation.roleId) ?? 'Unknown role' }))
    },

    getById: (id: number) => apiFetch<Invitation>(`/invitations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }),

    create: (payload: InvitationPayload) => apiFetch<Invitation>('/invitations', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: InvitationPayload) => apiFetch<Invitation>(`/invitations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/invitations/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    }),
}
