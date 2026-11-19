import { useState } from 'react'
import Button from '../../../components/ui/Button'
import UserList from '../components/UserList'
import UserFormDialog from '../components/UserFormDialog'
import UserDeleteDialog from '../components/UserDeleteDialog'
import { useUsers } from '../hooks/useUsers.js'
import type { User } from '../types/user.js'

function UsersPage() {
    const { users, loading, error, reload, saveUser, deleteUser } = useUsers()
    const [formOpen, setFormOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)

    function openForm(user: User | null) {
        setSelectedUser(user)
        setFormOpen(true)
    }

    return (
        <main className="mx-auto max-w-6xl p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">User list</h1>
                <Button onClick={() => openForm(null)} disabled={loading}
                    className="rounded px-4 py-2 disabled:opacity-50">New user</Button>
            </div>

            {error && (
                <div className="mb-4">
                    <p role="alert" className="text-red-600">{error}</p>
                    <Button variant="secondary" disabled={loading}
                        onClick={() => void reload()} className="mt-2 rounded px-4 py-2">
                        Reload
                    </Button>
                </div>
            )}

            {loading ? (
                <p role="status">Loading users...</p>
            ) : users.length === 0 ? (
                !error && <p>No users available.</p>
            ) : (
                <UserList users={users} onEdit={openForm} onDelete={setUserToDelete} />
            )}
            {formOpen && <UserFormDialog user={selectedUser}
                onSave={payload => saveUser(selectedUser?.id ?? null, payload)}
                onClose={() => setFormOpen(false)} />}
            {userToDelete && <UserDeleteDialog user={userToDelete}
                onConfirm={() => deleteUser(userToDelete.id)}
                onClose={() => setUserToDelete(null)} />}
        </main>
    )
}

export default UsersPage