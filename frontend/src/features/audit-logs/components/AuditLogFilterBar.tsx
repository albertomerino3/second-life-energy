import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { EMPTY_FILTERS } from '../types/auditLog.js'
import type { AuditLogFilters } from '../types/auditLog.js'

const inputClass = 'mt-1 w-full rounded border border-gray-300 p-2'

export default function AuditLogFilterBar({ onApply }: { onApply: (filters: AuditLogFilters) => void }) {
    const [draft, setDraft] = useState(EMPTY_FILTERS)

    const bind = (key: keyof AuditLogFilters) => ({
        value: draft[key],
        onChange: (event: ChangeEvent<HTMLInputElement>) => setDraft(current => ({ ...current, [key]: event.target.value })),
    })

    function submit(event: FormEvent) {
        event.preventDefault()
        onApply(draft)
    }

    function clear() {
        setDraft(EMPTY_FILTERS)
        onApply(EMPTY_FILTERS)
    }

    return <form onSubmit={submit} aria-label="Filter audit logs" className="mb-6 grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="block text-sm">Entity
            <input {...bind('entity')} maxLength={100} placeholder="e.g. Bicycle" className={inputClass} />
        </label>
        <label className="block text-sm">Action
            <input {...bind('action')} maxLength={30} placeholder="e.g. UPDATE" className={inputClass} />
        </label>
        <label className="block text-sm">User ID
            <input {...bind('userId')} type="number" min={1} className={inputClass} />
        </label>
        <label className="block text-sm">From
            <input {...bind('from')} type="date" className={inputClass} />
        </label>
        <label className="block text-sm">To
            <input {...bind('to')} type="date" className={inputClass} />
        </label>
        <div className="flex gap-2">
            <Button type="submit" className="rounded px-4 py-2">Apply</Button>
            <Button type="button" variant="secondary" onClick={clear} className="rounded px-4 py-2">Clear</Button>
        </div>
    </form>
}