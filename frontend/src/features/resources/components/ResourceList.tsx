import Button from '../../../components/ui/Button'
import type { Resource } from '../types/resource.js'
import ResourceStatusBadge from './ResourceStatusBadge.js'

export default function ResourceList({ resources, onEdit, onDelete }: {
    resources: Resource[]
    onEdit: (resource: Resource) => void
    onDelete: (resource: Resource) => void
}) {
    return <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
            <caption className="sr-only">Resources</caption>
            <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Title</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Topic</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Difficulty</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Published</th>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {resources.map(resource => <tr key={resource.id}>
                    <th scope="row" className="px-4 py-3 font-medium [overflow-wrap:anywhere]">{resource.title}</th>
                    <td className="px-4 py-3 capitalize">{resource.type}</td>
                    <td className="px-4 py-3 [overflow-wrap:anywhere]">{resource.topic}</td>
                    <td className="px-4 py-3 capitalize">{resource.difficulty}</td>
                    <td className="px-4 py-3"><ResourceStatusBadge status={resource.status} /></td>
                    <td className="whitespace-nowrap px-4 py-3">{resource.publishedAt ? new Date(resource.publishedAt).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" aria-label={`Edit ${resource.title}`} onClick={() => onEdit(resource)} className="rounded px-3 py-1">Edit</Button>
                            <Button variant="danger" aria-label={`Delete ${resource.title}`} onClick={() => onDelete(resource)} className="rounded px-3 py-1">Delete</Button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}
