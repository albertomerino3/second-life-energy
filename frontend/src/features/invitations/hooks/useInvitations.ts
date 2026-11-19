import { useEffect, useState } from 'react'
import type { Invitation, InvitationPayload } from '../types/invitation.js'
import { invitationService } from '../services/invitationService.js'

export function useInvitations() {
    const [invitations, setInvitations] = useState<Invitation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function loadInvitations() {
        try {
            setLoading(true)
            setError(null)
            const data = await invitationService.getAll()
            setInvitations(data)
        }
        catch {
            setError('Could not load invitations.')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => { void loadInvitations() }, [])

    async function saveInvitation(id: number | null, payload: InvitationPayload) {
        setError(null)

        try {
            if (id === null) {
                await invitationService.create(payload)
            }
            else {
                await invitationService.update(id, payload)
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Could not save the invitation.')
            throw error
        }
        await loadInvitations()
    }

    async function deleteInvitation(id: number) {
        try {
            setError(null)
            await invitationService.remove(id)
            setInvitations(previous => previous.filter(invitation => invitation.id !== id))
            await loadInvitations()
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Could not delete the invitation.')
            throw error
        }
    }

    return {
        invitations,
        loading,
        error,
        setError,
        loadInvitations,
        saveInvitation,
        deleteInvitation,
    }
}
