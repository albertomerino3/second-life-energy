import { useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import InvitationList from '../components/InvitationList.js'
import InvitationModal from '../components/InvitationModal.js'
import InvitationDeleteModal from '../components/InvitationDeleteModal.js'
import { useInvitations } from '../hooks/useInvitations.js'
import type { Invitation, InvitationPayload } from '../types/invitation.js'

function InvitationsPage() {
    const { invitations, loading, error, setError, loadInvitations, saveInvitation, deleteInvitation } = useInvitations()
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [invitationToDelete, setInvitationToDelete] = useState<Invitation | null>(null)
    const deletingRef = useRef(false)

    function openModal(invitation: Invitation | null) {
        setError(null)
        setSelectedInvitation(invitation)
        setModalOpen(true)
    }

    async function handleSave(payload: InvitationPayload) {
        await saveInvitation(selectedInvitation?.id ?? null, payload)
        setModalOpen(false)
    }

    async function handleDelete() {
        if (deletingRef.current || !invitationToDelete) return
        deletingRef.current = true
        setDeleting(true)
        try {
            await deleteInvitation(invitationToDelete.id)
            setInvitationToDelete(null)
        } catch {
            // Keep the dialog open so the user can retry a failed backend deletion.
        } finally {
            deletingRef.current = false
            setDeleting(false)
        }
    }

    return (
        <main className="mx-auto max-w-6xl p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">Invitation list</h1>
                <Button onClick={() => openModal(null)} disabled={loading || deleting}
                    className="rounded px-4 py-2 disabled:opacity-50">New invitation</Button>
            </div>

            {error && !modalOpen && (
                <div className="mb-4">
                    <p role="alert" className="text-red-600">{error}</p>
                    <Button variant="secondary" disabled={loading || deleting}
                        onClick={() => void loadInvitations()} className="mt-2 rounded px-4 py-2">
                        Reload
                    </Button>
                </div>
            )}

            {loading ? (
                <p role="status">Loading invitations...</p>
            ) : invitations.length === 0 ? (
                !error && <p>No invitations available.</p>
            ) : (
                <InvitationList invitations={invitations}
                    onEdit={deleting ? undefined : (id) => {
                        const invitation = invitations.find((item) => item.id === id)
                        if (invitation) openModal(invitation)
                    }}
                    onDelete={deleting ? undefined : (id) => {
                        const invitation = invitations.find((item) => item.id === id)
                        if (invitation) {
                            setError(null)
                            setInvitationToDelete(invitation)
                        }
                    }} />
            )}
            {modalOpen && <InvitationModal invitation={selectedInvitation} onSave={handleSave}
                onClose={() => setModalOpen(false)} />}
            {invitationToDelete && <InvitationDeleteModal invitation={invitationToDelete} deleting={deleting}
                error={error}
                onConfirm={() => void handleDelete()} onClose={() => setInvitationToDelete(null)} />}
        </main>
    )
}

export default InvitationsPage
