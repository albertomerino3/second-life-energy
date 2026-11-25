import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import type { Invitation, InvitationPayload } from '../types/invitation.js'
import InvitationFormFields from './InvitationFormFields.js'
import type { InvitationFormValues } from './InvitationFormFields.js'
import { useRoles } from '../../roles/hooks/useRoles.js'

interface InvitationFormProps {
    invitation: Invitation | null
    onSave: (payload: InvitationPayload) => Promise<void>
    onCancel: () => void
    onSavingChange: (saving: boolean) => void
}

function InvitationForm({ invitation, onSave, onCancel, onSavingChange }: InvitationFormProps) {
    const { roles, loading, error: rolesError, reload } = useRoles()
    const [values, setValues] = useState<InvitationFormValues>(() => ({
        email: invitation?.email ?? '',
        roleId: invitation ? String(invitation.roleId) : '',
    }))
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const submitting = useRef(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting.current) return

        const payload: InvitationPayload = {
            email: values.email.trim(),
            roleId: Number(values.roleId),
        }

        if (loading || rolesError || !roles.some(role => role.id === payload.roleId) || !payload.email || payload.email.length > 255) {
            setError('Check the email and the role.')
            return
        }

        submitting.current = true
        setSaving(true)
        onSavingChange(true)
        setError(null)
        try {
            await onSave(payload)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Could not save the invitation. Please try again.')
        } finally {
            submitting.current = false
            setSaving(false)
            onSavingChange(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" aria-busy={saving}>
            {loading && <p role="status">Loading roles...</p>}
            {rolesError && <div><p role="alert" className="text-red-600">{rolesError}</p><Button type="button" onClick={() => void reload()} variant="secondary" className="rounded px-3 py-2">Reload roles</Button></div>}
            {!loading && !rolesError && roles.length === 0 && <p role="status">No roles available. Create one in the Roles section before saving an invitation.</p>}
            <InvitationFormFields values={values} roles={roles} disabled={saving || loading || !!rolesError || roles.length === 0}
                onChange={(field, value) => setValues((previous) => ({ ...previous, [field]: value }))} />
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" disabled={saving} onClick={onCancel}
                    className="rounded px-4 py-2 disabled:opacity-50">Cancel</Button>
                <Button type="submit" disabled={saving || loading || !!rolesError || roles.length === 0} className="rounded px-4 py-2 disabled:opacity-50">
                    {saving ? 'Saving...' : invitation ? 'Save changes' : 'Create invitation'}
                </Button>
            </div>
        </form>
    )
}

export default InvitationForm
