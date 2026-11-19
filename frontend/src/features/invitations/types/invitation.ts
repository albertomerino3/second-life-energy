export interface Invitation {
    id: number
    invitedById: number
    roleId: number
    role: string
    email: string
    expiresAt: string
    usedAt: string | null
    createdAt?: string
}
export interface InvitationPayload {
    roleId: number
    email: string
}
