import TagsPage from './features/tags/pages/TagsPage'
import RolesPage from './features/roles/pages/RolesPage'
import ResourceTagsPage from './features/resource-tags/pages/ResourceTagsPage'
import UserRolesPage from './features/user-roles/pages/UserRolesPage'
import SimulationArticlesPage from './features/simulation-articles/pages/SimulationArticlesPage'
import SimulationResourcesPage from './features/simulation-resources/pages/SimulationResourcesPage'
import { useEffect, useState } from 'react'
import AuthPage from './features/auth/pages/AuthPage'
import { clearSession, getSession, SESSION_EVENT } from './services/session'

type Page = 'tags' | 'roles' | 'resource-tags' | 'user-roles' | 'simulation-articles' | 'simulation-resources'

function App() {
  const [session, setSession] = useState(getSession)
  const [page, setPage] = useState<Page>('tags')

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

  const navItems: { id: Page; label: string }[] = [
    { id: 'tags', label: 'Tags' },
    { id: 'roles', label: 'Roles' },
    { id: 'resource-tags', label: 'Resource Tags' },
    { id: 'user-roles', label: 'User Roles' },
    { id: 'simulation-articles', label: 'Sim. Articles' },
    { id: 'simulation-resources', label: 'Sim. Resources' },
  ]

  return <>
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
      <span className="font-semibold text-emerald-700">Second Life Energy · {session.username}</span>
      <button type="button" onClick={clearSession} className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">Sign out</button>
    </header>
    <nav aria-label="Shop management" className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 pt-6 sm:px-6">
      {navItems.map(item => (
        <button key={item.id} type="button" aria-current={page === item.id ? 'page' : undefined}
          onClick={() => setPage(item.id)}
          className={`rounded px-4 py-2 ${page === item.id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
          {item.label}
        </button>
      ))}
    </nav>
    {page === 'tags' ? <TagsPage /> :
     page === 'roles' ? <RolesPage /> :
     page === 'resource-tags' ? <ResourceTagsPage /> :
     page === 'user-roles' ? <UserRolesPage /> :
     page === 'simulation-articles' ? <SimulationArticlesPage /> :
     <SimulationResourcesPage />}
  </>
}
export default App