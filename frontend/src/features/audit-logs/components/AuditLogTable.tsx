import Button from '../../../components/ui/Button'
import type { AuditLog } from '../types/auditLog.js'

function actionStyle(action: string) {
    switch (action.toLowerCase()) {
        case 'create': return 'bg-green-100 text-green-800'
        case 'update': return 'bg-amber-100 text-amber-800'
        case 'delete': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

export default function AuditLogTable({ items, busy, onSelect }: {
    items: AuditLog[]; busy: boolean; onSelect: (log: AuditLog) => void
}) {
    return <div aria-busy={busy} className={`relative overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm ${busy ? 'opacity-50' : ''}`}>
        <table className="w-full text-left text-sm">
            <caption className="sr-only">Audit logs</caption>
            <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                    <th scope="col" className="px-4 py-3 font-semibold">User</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Action</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Entity</th>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Details</span></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {items.map(log => <tr key={log.id}>
                    <td className="whitespace-nowrap px-4 py-3">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{log.userId ?? 'System'}</td>
                    <td className="px-4 py-3">
                        <span className={`rounded px-2 py-1 text-xs font-semibold ${actionStyle(log.action)}`}>{log.action}</span>
                    </td>
                    <td className="px-4 py-3">{log.entity} #{log.entityId}</td>
                    <td className="px-4 py-3 text-right">
                        <Button variant="secondary" aria-label={`View details of log ${log.id}`} onClick={() => onSelect(log)} className="rounded px-3 py-1">View</Button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}