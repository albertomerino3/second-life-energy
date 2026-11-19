import type { ResourceStatus } from '../types/resource.js'

// Record<ResourceStatus, ...> obliga a cubrir todos los estados: si el backend añade uno, TypeScript avisa.
const STATUS: Record<ResourceStatus, { label: string; className: string }> = {
    draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
    published: { label: 'Published', className: 'bg-green-100 text-green-800' },
}

export default function ResourceStatusBadge({ status }: { status: ResourceStatus }) {
    const { label, className } = STATUS[status] ?? { label: status, className: 'bg-gray-100 text-gray-800' }
    return <span className={`rounded px-2 py-1 text-xs font-semibold ${className}`}>{label}</span>
}
