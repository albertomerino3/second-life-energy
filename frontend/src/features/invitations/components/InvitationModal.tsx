import { useEffect, useId, useRef, useState } from 'react'
import type { Invitation, InvitationPayload } from '../types/invitation.js'
import InvitationForm from './InvitationForm'

interface InvitationModalProps {
    invitation: Invitation | null
    onSave: (payload: InvitationPayload) => Promise<void>
    onClose: () => void
}

function InvitationModal({ invitation, onSave, onClose }: InvitationModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const dialog = dialogRef.current
        dialog?.showModal()
        return () => dialog?.close()
    }, [])

    return (
        <dialog ref={dialogRef} aria-labelledby={titleId}
            className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50"
            onCancel={(event) => {
                event.preventDefault()
                if (!saving) onClose()
            }}>
            <h2 id={titleId} className="mb-4 text-xl font-bold">
                {invitation ? 'Edit invitation' : 'New invitation'}
            </h2>
            <InvitationForm invitation={invitation} onSave={onSave} onCancel={onClose}
                onSavingChange={setSaving} />
        </dialog>
    )
}

export default InvitationModal
