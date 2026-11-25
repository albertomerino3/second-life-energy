import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import type { User, UserPayload } from '../types/user.js'

export default function UserFormDialog({ user, onSave, onClose }: {
    user: User | null
    onSave: (payload: UserPayload) => Promise<void>
    onClose: () => void
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const heading = useId()
    const submitting = useRef(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState(() => ({
        name: user?.name ?? '',
        email: user?.email ?? '',
        isActive: user?.isActive ?? true,
    }))

    useEffect(() => {
        const element = dialog.current
        element?.showModal()
        return () => element?.close()
    }, [])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting.current) return

        // find() devuelve el valor ya tipado como unión (o undefined si no es válido), sin necesidad de `as`.
        const name = values.name.trim()
        const email = values.email.trim()

        if (!name || !email || name.length > 150 || email.length > 255) {
            setError('Check the name and the email.')
            return
        }

        submitting.current = true
        setBusy(true)
        setError('')
        try {
            await onSave({ name, email, isActive: values.isActive })
            onClose()
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : 'Could not save the user. Please try again.')
            submitting.current = false
            setBusy(false)
        }
    }

    const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

    return <dialog ref={dialog} aria-labelledby={heading} aria-busy={busy}
        onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={heading} className="mb-4 text-xl font-bold">{user ? 'Edit user' : 'New user'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset disabled={busy} className="space-y-4 disabled:opacity-60">
                <label className="block">
                    Name
                    <input autoFocus name="name" required maxLength={150} pattern=".*\S.*"
                        className={inputClass} value={values.name}
                        onChange={event => setValues(previous => ({ ...previous, name: event.target.value }))} />
                </label>
                <label className="block">
                    Email
                    <input name="email" type="email" required maxLength={255}
                        className={inputClass} value={values.email}
                        onChange={event => setValues(previous => ({ ...previous, email: event.target.value }))} />
                </label>
                <label className="flex items-center gap-2">
                    <input name="isActive" type="checkbox" checked={values.isActive}
                        onChange={event => setValues(previous => ({ ...previous, isActive: event.target.checked }))} />
                    Active
                </label>
            </fieldset>
            {error && <p role="alert" className="text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" disabled={busy} onClick={onClose} className="rounded px-4 py-2 disabled:opacity-50">Cancel</Button>
                <Button type="submit" disabled={busy} className="rounded px-4 py-2 disabled:opacity-50">
                    {busy ? 'Saving...' : user ? 'Save changes' : 'Create user'}
                </Button>
            </div>
        </form>
    </dialog>
}