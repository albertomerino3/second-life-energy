import Button from '../../../components/ui/Button'
import type { User } from '../types/user'

export default function UserList({ users, onEdit, onDelete }: {
    users: User[]
    onEdit: (user: User) => void
    onDelete: (user: User) => void
}) {
    return <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
            <caption className="sr-only">Users</caption>
            <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Created</th>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {users.map(user => <tr key={user.id}>
                    <th scope="row" className="px-4 py-3 font-medium [overflow-wrap:anywhere]">{user.name}</th>
                    <td className="px-4 py-3 [overflow-wrap:anywhere]">{user.email}</td>
                    <td className="px-4 py-3">
                        <span className={`rounded px-2 py-1 text-xs font-semibold ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" aria-label={`Edit ${user.name}`} onClick={() => onEdit(user)} className="rounded px-3 py-1">Edit</Button>
                            <Button variant="danger" aria-label={`Delete ${user.name}`} onClick={() => onDelete(user)} className="rounded px-3 py-1">Delete</Button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}