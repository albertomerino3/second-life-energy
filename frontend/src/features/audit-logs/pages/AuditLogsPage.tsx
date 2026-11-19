import { useState } from 'react'
import Button from '../../../components/ui/Button'
import AuditLogDetail from '../components/AuditLogDetail.tsx'
import AuditLogFilterBar from '../components/AuditLogFilterBar.js'
import AuditLogTable from '../components/AuditLogTable.tsx'
import { PAGE_SIZE, useAuditLogs } from '../hooks/useAuditLogs.js'
import { EMPTY_FILTERS } from '../types/auditLog.js'
import type { AuditLog, AuditLogFilters } from '../types/auditLog.js'

export default function AuditLogsPage() {
    const [filters, setFilters] = useState<AuditLogFilters>(EMPTY_FILTERS)
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState<AuditLog | null>(null)
    const { items, total, loading, error, reload } = useAuditLogs(filters, page)
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    function applyFilters(next: AuditLogFilters) {
        setFilters(next)
        setPage(1)
    }

    return <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <h1 className="mb-6 text-3xl font-bold">Audit logs</h1>
        <AuditLogFilterBar onApply={applyFilters} />
        {error && <div className="mb-4">
            <p role="alert" className="text-red-600">{error}</p>
            <Button variant="secondary" onClick={reload} className="mt-2 rounded px-4 py-2">Reload</Button>
        </div>}
        {loading && items.length === 0 ? <p role="status">Loading audit logs...</p> :
            !error && items.length === 0 ? <p>No audit logs match these filters.</p> :
                items.length > 0 && <>
                    <AuditLogTable items={items} busy={loading} onSelect={setSelected} />
                    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between">
                        <Button variant="secondary" disabled={loading || page <= 1} onClick={() => setPage(page - 1)} className="rounded px-4 py-2">Previous</Button>
                        <span className="text-sm">Page {page} of {totalPages} · {total} records</span>
                        <Button variant="secondary" disabled={loading || page >= totalPages} onClick={() => setPage(page + 1)} className="rounded px-4 py-2">Next</Button>
                    </nav>
                </>}
        {selected && <AuditLogDetail log={selected} onClose={() => setSelected(null)} />}
    </main>
}