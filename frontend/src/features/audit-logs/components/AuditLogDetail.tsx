import { useEffect, useId, useRef } from 'react'
import Button from '../../../components/ui/Button'
import type { AuditLog } from '../types/auditLog.js'

interface Change { field: string; before: unknown; after: unknown }

// Compara previousValues y newValues y devuelve solo los campos que cambiaron.
// CREATE (previous null) lista todos los campos nuevos; DELETE (new null) todos los eliminados.
function getChanges(log: AuditLog): Change[] {
    const before = log.previousValues ?? {}
    const after = log.newValues ?? {}
    return [...new Set([...Object.keys(before), ...Object.keys(after)])]
        .filter(field => JSON.stringify(before[field]) !== JSON.stringify(after[field]))
        .map(field => ({ field, before: before[field], after: after[field] }))
}

function formatValue(value: unknown) {
    if (value === undefined || value === null) return '—'
    return typeof value === 'string' ? value : JSON.stringify(value)
}

export default function AuditLogDetail({ log, onClose }: { log: AuditLog; onClose: () => void }) {
    const dialog = useRef<HTMLDialogElement>(null)
    const title = useId()
    const changes = getChanges(log)

    useEffect(() => {
        const element = dialog.current
        element?.showModal()
        return () => element?.close()
    }, [])

    return <dialog ref={dialog} aria-labelledby={title} onCancel={event => { event.preventDefault(); onClose() }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl backdrop:bg-black/50">
        <h2 id={title} className="mb-1 text-xl font-bold">{log.action} on {log.entity} #{log.entityId}</h2>
        <p className="mb-4 text-sm text-gray-600">
            {new Date(log.createdAt).toLocaleString()} by {log.userId ? `user ${log.userId}` : 'the system'}
        </p>
        {changes.length === 0 ? <p>No field changes were recorded.</p> :
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <th scope="col" className="py-2 pr-4 font-semibold">Field</th>
                            <th scope="col" className="py-2 pr-4 font-semibold">Before</th>
                            <th scope="col" className="py-2 font-semibold">After</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {changes.map(change => <tr key={change.field}>
                            <th scope="row" className="py-2 pr-4 font-medium">{change.field}</th>
                            <td className="py-2 pr-4 text-red-700 [overflow-wrap:anywhere]">{formatValue(change.before)}</td>
                            <td className="py-2 text-green-700 [overflow-wrap:anywhere]">{formatValue(change.after)}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>}
        <div className="mt-6 flex justify-end">
            <Button autoFocus type="button" variant="secondary" onClick={onClose} className="rounded px-4 py-2">Close</Button>
        </div>
    </dialog>
}