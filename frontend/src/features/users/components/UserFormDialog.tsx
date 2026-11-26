import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { imageUrl } from '../../../services/api'
import type { User, UserPayload } from '../types/user.js'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

export default function UserFormDialog({ user, onSave, onClose }: {
    user: User | null
    onSave: (payload: UserPayload) => Promise<void>
    onClose: () => void
}) {
    const dialog = useRef<HTMLDialogElement>(null)
    const heading = useId()
    const imageId = useId()
    const submitting = useRef(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState(() => ({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        isActive: user?.isActive ?? true,
    }))
    const [image, setImage] = useState<File | undefined>()
    const [preview, setPreview] = useState<string | undefined>()

    useEffect(() => {
        const element = dialog.current
        element?.showModal()
        return () => element?.close()
    }, [])

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview) }
    }, [preview])

    const currentImage = image ? preview : user?.filename ? imageUrl(user.filename) : undefined

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting.current) return

        const name = values.name.trim()
        const email = values.email.trim()

        if (!name || !email || name.length > 150 || email.length > 255) {
            setError('Check the name and the email.')
            return
        }
        // Al crear la contraseña es obligatoria; al editar, vacía significa mantener la actual.
        if ((!user && !values.password) || (values.password && values.password.length < 8)) {
            setError('The password must have at least 8 characters.')
            return
        }

        submitting.current = true
        setBusy(true)
        setError('')
        try {
            await onSave({ name, email, isActive: values.isActive, password: values.password || undefined, image })
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
                <label className="block">
                    {user ? 'New password (optional)' : 'Password'}
                    <input name="password" type="password" autoComplete="new-password" required={!user} minLength={8}
                        className={inputClass} value={values.password}
                        onChange={event => setValues(previous => ({ ...previous, password: event.target.value }))} />
                </label>
                <label className="flex items-center gap-2">
                    <input name="isActive" type="checkbox" checked={values.isActive}
                        onChange={event => setValues(previous => ({ ...previous, isActive: event.target.checked }))} />
                    Active
                </label>
                <div className="space-y-2">
                    <label htmlFor={imageId} className="block font-medium">Profile image</label>
                    {currentImage && <img src={currentImage} alt="User preview" className="h-32 w-32 rounded-full border border-gray-200 object-cover" />}
                    <input id={imageId} type="file" accept={IMAGE_TYPES.join(',')} className="block w-full text-sm"
                        aria-describedby={`${imageId}-help`}
                        onChange={event => {
                            const file = event.target.files?.[0]
                            if (file && (!IMAGE_TYPES.includes(file.type) || file.size > 5 * 1024 * 1024)) {
                                setError('Choose a JPEG, PNG, WebP, GIF or AVIF image up to 5 MB.')
                                event.target.value = ''
                                setImage(undefined)
                                setPreview(undefined)
                                return
                            }
                            setError('')
                            setImage(file)
                            setPreview(file ? URL.createObjectURL(file) : undefined)
                        }} />
                    <p id={`${imageId}-help`} className="text-sm text-gray-600">
                        JPEG, PNG, WebP, GIF or AVIF. Maximum 5 MB.
                        {user && ' Leave empty to keep the current image.'}
                    </p>
                </div>
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
