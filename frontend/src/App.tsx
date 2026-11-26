import { useEffect, useState } from 'react'
import ArticleCategoriesPage from './features/articleCategory/pages/ArticleCategoriesPage'
import ArticlesPage from './features/articles/pages/ArticlesPage'
import AuditLogsPage from './features/audit-logs/pages/AuditLogsPage'
import AuthPage from './features/auth/pages/AuthPage'
import InvitationsPage from './features/invitations/pages/InvitationsPage'
import ResourcesPage from './features/resources/pages/ResourcesPage'
import RolesPage from './features/roles/pages/RolesPage'
import SimulationsPage from './features/simulations/pages/SimulationsPage'
import UsersPage from './features/users/pages/UsersPage'
import { clearSession, getSession, SESSION_EVENT } from './services/session'

// Una sola fuente de verdad: añadir una sección es añadir una línea aquí.
const PAGES = {
  articles: { label: 'Articles', Component: ArticlesPage },
  categories: { label: 'Categories', Component: ArticleCategoriesPage },
  resources: { label: 'Resources', Component: ResourcesPage },
  simulations: { label: 'Simulations', Component: SimulationsPage },
  invitations: { label: 'Invitations', Component: InvitationsPage },
  roles: { label: 'Roles', Component: RolesPage },
  users: { label: 'Users', Component: UsersPage },
  'audit-logs': { label: 'Audit logs', Component: AuditLogsPage },
} as const

type PageKey = keyof typeof PAGES
const PAGE_KEYS = Object.keys(PAGES) as PageKey[]

function App() {
  const [session, setSession] = useState(getSession)
  const [page, setPage] = useState<PageKey>('articles')
  useEffect(() => {
    const sync = () => setSession(getSession())
    window.addEventListener(SESSION_EVENT, sync)
    return () => window.removeEventListener(SESSION_EVENT, sync)
  }, [])
  useEffect(() => {
    if (!session) return
    const timeout = window.setTimeout(clearSession, Math.max(0, session.expiresAt - Date.now()))
    return () => window.clearTimeout(timeout)
  }, [session])
  if (!session) return <AuthPage />
  const CurrentPage = PAGES[page].Component
  return <>
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
      <span className="font-semibold text-emerald-700">Second Life Energy · {session.username}</span>
      <button type="button" onClick={clearSession} className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">Sign out</button>
    </header>
    <nav aria-label="Shop management" className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 pt-6 sm:px-6">
      {PAGE_KEYS.map(key => <button key={key} type="button" aria-current={page === key ? 'page' : undefined} onClick={() => setPage(key)}
        className={`rounded px-4 py-2 ${page === key ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{PAGES[key].label}</button>)}
    </nav>
    <CurrentPage />
  </>
}
export default App