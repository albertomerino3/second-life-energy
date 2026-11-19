import type { ArticleStatus } from '../types/article.js'

// Record<ArticleStatus, ...> obliga a cubrir todos los estados: si el backend añade uno, TypeScript avisa.
const STATUS: Record<ArticleStatus, { label: string; className: string }> = {
    draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
    in_review: { label: 'In review', className: 'bg-amber-100 text-amber-800' },
    published: { label: 'Published', className: 'bg-green-100 text-green-800' },
    returned: { label: 'Returned', className: 'bg-red-100 text-red-800' },
}

export default function ArticleStatusBadge({ status }: { status: ArticleStatus }) {
    const { label, className } = STATUS[status] ?? { label: status, className: 'bg-gray-100 text-gray-800' }
    return <span className={`rounded px-2 py-1 text-xs font-semibold ${className}`}>{label}</span>
}