import { useCallback, useEffect, useState } from 'react'
import { userService } from '../services/userService.js'
import type { User, UserPayload } from '../types/user.js'

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        try {
            setError('')
            setUsers(await userService.getAll())
        } catch {
            setError('Could not load users.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { void load() }, [load])

    // Guardar y borrar lanzan el error: el diálogo que los llama lo muestra junto al formulario.
    async function saveUser(id: number | null, payload: UserPayload) {
        if (id === null) await userService.create(payload)
        else await userService.update(id, payload)
        await load()
    }

    async function deleteUser(id: number) {
        await userService.remove(id)
        await load()
    }

    return { users, loading, error, reload: load, saveUser, deleteUser }
}