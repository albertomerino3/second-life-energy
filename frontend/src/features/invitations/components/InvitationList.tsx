import type { Invitation } from '../types/invitation.js'
import InvitationRow from './InvitationRow.js'

interface InvitationListProps {
    invitations: Invitation[]
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

function InvitationList({ invitations, onEdit, onDelete }: InvitationListProps) {
    return (
        <div className="lg:overflow-hidden lg:rounded-lg lg:bg-white lg:shadow">
            <div aria-hidden="true"
                className={`hidden gap-4 bg-gray-800 p-4 font-semibold text-white lg:grid ${
                    onEdit || onDelete ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
                }`}>
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
                <span>Expires</span>
                {(onEdit || onDelete) && <span>Actions</span>}
            </div>
            <ul aria-label="Invitation list" className="grid min-w-0 gap-4 lg:gap-0">
                {invitations.map((invitation) => (
                    <InvitationRow key={invitation.id} invitation={invitation}
                        onEdit={onEdit} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    )
}
export default InvitationList
