import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { useRoles } from '../hooks/useRoles'
import { roleService } from '../services/roleService'
import type { Role } from '../services/roleService'

function RoleDialog({ role, remove, onClose, onSaved }: {
    role: Role | null; remove: boolean; onClose: () => void; onSaved: () => Promise<void>
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const title = useId()
    const [name, setName] = useState(role?.name ?? '')
    const [description, setDescription] = useState(role?.description ?? '')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const submitting = useRef(false)
    useEffect(() => {
        const element = dialog.current
        element?.showModal()
        return () => element?.close()
    }, [])
    async function submit(event: FormEvent) {
        event.preventDefault()
        if (submitting.current) return
        if (!remove && (!name.trim() || name.trim().length > 100 || description.trim().length > 255)) {
            setError('Enter a name between 1 and 100 characters and a description up to 255.')
            return
        }
        submitting.current = true
        setBusy(true)
        setError('')
        const payload = { name: name.trim(), description: description.trim() || null }
        try {
            if (remove && role) await roleService.remove(role.id)
            else if (role) await roleService.update(role.id, payload)
            else await roleService.create(payload)
        } catch {
            setError(remove ? 'Could not delete the role. Check that it has no associated users or invitations.' : 'Could not save the role. Check that the name is unique and try again.')
            submitting.current = false
            setBusy(false)
            return
        }
        await onSaved()
        onClose()
    }
    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'
    return <dialog ref={dialog} aria-labelledby={title} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={title} className="mb-4 text-xl font-bold">{remove ? 'Delete role' : role ? 'Edit role' : 'New role'}</h2>
        <form onSubmit={submit} className="space-y-4">
            {remove ? <p>Do you want to delete the role <strong>{role?.name}</strong>? This action cannot be undone.</p> : <>
                <label className="block">Name
                    <input autoFocus required maxLength={100} pattern=".*\S.*" value={name} disabled={busy}
                        onChange={event => setName(event.target.value)} className={inputClass} />
                </label>
                <label className="block">Description (optional)
                    <textarea rows={3} maxLength={255} value={description} disabled={busy}
                        onChange={event => setDescription(event.target.value)} className={inputClass} />
                </label>
            </>}
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button autoFocus={remove} type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2">Cancel</Button>
                <Button type="submit" variant={remove ? 'danger' : 'primary'} disabled={busy} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Processing...' : remove ? 'Delete' : role ? 'Save changes' : 'Create role'}
                </Button>
            </div>
        </form>
    </dialog>
}

export default function RolesPage() {
    const { roles, loading, error, reload } = useRoles()
    const [dialog, setDialog] = useState<{ role: Role | null; remove: boolean } | null>(null)
    return <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Role list</h1>
            <Button disabled={loading} onClick={() => setDialog({ role: null, remove: false })} className="rounded px-4 py-2">New role</Button>
        </div>
        {error && <div className="mb-4"><p role="alert" className="text-red-600">{error}</p><Button onClick={() => void reload()} disabled={loading} variant="secondary" className="mt-2 rounded px-4 py-2">Reload</Button></div>}
        {loading ? <p role="status">Loading roles...</p> : !error && roles.length === 0 ? <p>No roles available. Create one to send invitations.</p> :
            <ul aria-label="Role list" className="space-y-3">
                {roles.map(role => <li key={role.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="min-w-0">
                        <p className="font-semibold [overflow-wrap:anywhere]">{role.name}</p>
                        {role.description && <p className="text-sm text-gray-600 [overflow-wrap:anywhere]">{role.description}</p>}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" aria-label={`Edit ${role.name}`} onClick={() => setDialog({ role, remove: false })} className="rounded px-3 py-2">Edit</Button>
                        <Button variant="danger" aria-label={`Delete ${role.name}`} onClick={() => setDialog({ role, remove: true })} className="rounded px-3 py-2">Delete</Button>
                    </div>
                </li>)}
            </ul>}
        {dialog && <RoleDialog {...dialog} onClose={() => setDialog(null)} onSaved={reload} />}
    </main>
}
