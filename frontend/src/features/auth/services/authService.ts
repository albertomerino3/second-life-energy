import { apiFetch } from '../../../services/api'
import { saveSession } from '../../../services/session'
import type { AuthCredentials, AuthResponse } from '../types/auth'

// No hay registro público (HU-06): solo inicio de sesión con email y contraseña.
export const authService = {
    async login({ email, password }: AuthCredentials) {
        const bytes = new TextEncoder().encode(`${email.trim()}:${password}`)
        const credentials = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''))
        const result = await apiFetch<AuthResponse>('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Basic ${credentials}` },
        })

        if (!result.token || !Number.isFinite(result.expiresIn) || result.expiresIn <= 0) {
            throw new Error('The server did not return a valid session.');
        }
        saveSession({ token: result.token, username: email.trim(), expiresAt: Date.now() + result.expiresIn * 1000 })

        return result
    },
}
