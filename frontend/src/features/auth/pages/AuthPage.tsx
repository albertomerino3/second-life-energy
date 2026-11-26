import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { authService } from '../services/authService'

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')
    const submitting = useRef(false)

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting.current) return
        setError('')
        if (!email.trim() || !password) return setError('Enter your email and password.')
        submitting.current = true
        setPending(true)
        try {
            await authService.login({ email, password })
        } catch (cause) {
            setError(cause instanceof TypeError ? 'Could not connect to the server. Check that the backend is running.' : cause instanceof Error ? cause.message : 'Could not complete the request.')
        } finally {
            submitting.current = false
            setPending(false)
        }
    }

    const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:opacity-60'
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12 text-slate-900">
            <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-10" aria-labelledby="auth-title">
                <p className="mb-8 text-sm font-bold tracking-widest text-emerald-700">SECOND LIFE ENERGY</p>
                <h1 id="auth-title" className="text-3xl font-bold">Welcome back</h1>
                <p className="mt-3 mb-8 text-slate-500">Sign in to manage articles and resources.</p>
                <form onSubmit={submit} className="space-y-5" aria-busy={pending}>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                        <input id="email" name="email" type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} disabled={pending} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} disabled={pending} className={inputClass} />
                    </div>
                    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                    <button type="submit" disabled={pending} className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60">
                        {pending ? 'Connecting…' : 'Sign in'}
                    </button>
                </form>
                <p className="mt-7 text-center text-sm text-slate-600">
                    Accounts are created by invitation. Ask an administrator or a teacher for access.
                </p>
            </section>
        </main>
    )
}
