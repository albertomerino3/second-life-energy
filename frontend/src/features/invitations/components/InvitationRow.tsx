import Button from '../../../components/ui/Button'
import type { Invitation } from '../types/invitation.js'

interface InvitationRowProps {
    invitation: Invitation
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

function InvitationRow({
    invitation,
    onEdit,
    onDelete,
}: InvitationRowProps) {
    const expiresAt = new Date(invitation.expiresAt)
    const status = invitation.usedAt ? 'Used' : expiresAt.getTime() < Date.now() ? 'Expired' : 'Pending'

    return (
        <li className={`grid min-w-0 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-50 lg:items-center lg:rounded-none lg:border-0 lg:border-b lg:shadow-none lg:last:border-b-0 ${
            onEdit || onDelete ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        }`}>
            <dl className="grid min-w-0 grid-cols-2 gap-4 lg:contents">
                <div className="col-span-2 min-w-0 lg:col-span-1">
                    <dt className="mb-1 text-sm text-gray-600 lg:sr-only">Email</dt>
                    <dd className="font-semibold [overflow-wrap:anywhere]">{invitation.email}</dd>
                </div>
                <div className="min-w-0">
                    <dt className="mb-1 text-sm text-gray-600 lg:sr-only">Role</dt>
                    <dd className="[overflow-wrap:anywhere]">{invitation.role}</dd>
                </div>
                <div className="min-w-0">
                    <dt className="mb-1 text-sm text-gray-600 lg:sr-only">Status</dt>
                    <dd className="[overflow-wrap:anywhere]">{status}</dd>
                </div>
                <div className="min-w-0">
                    <dt className="mb-1 text-sm text-gray-600 lg:sr-only">Expires</dt>
                    <dd className="[overflow-wrap:anywhere]">{expiresAt.toLocaleString()}</dd>
                </div>
            </dl>
            {(onEdit || onDelete) && (
                <div className="flex min-w-0 flex-wrap gap-2 border-t border-gray-100 pt-4 lg:border-0 lg:pt-0">
                    {onEdit && !invitation.usedAt && <Button type="button" variant="secondary"
                        className="min-h-11 flex-1 rounded px-3 py-2 lg:flex-none"
                        aria-label={`Edit invitation for ${invitation.email}`}
                        onClick={() => onEdit(invitation.id)}>Edit</Button>}
                    {onDelete && <Button type="button" variant="danger"
                        className="min-h-11 flex-1 rounded px-3 py-2 lg:flex-none"
                        aria-label={`Delete invitation for ${invitation.email}`}
                        onClick={() => onDelete(invitation.id)}>Delete</Button>}
                </div>
            )}
        </li>
    )
}
export default InvitationRow
