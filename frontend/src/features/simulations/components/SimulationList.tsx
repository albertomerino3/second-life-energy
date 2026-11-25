import Button from '../../../components/ui/Button'
import type { Simulation } from '../types/simulation'

export default function SimulationList({ simulations, onEdit, onDelete }: {
    simulations: Simulation[]
    onEdit: (simulation: Simulation) => void
    onDelete: (simulation: Simulation) => void
}) {
    return <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
            <caption className="sr-only">Simulations</caption>
            <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Title</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Platform</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Link</th>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {simulations.map(simulation => <tr key={simulation.id}>
                    <th scope="row" className="px-4 py-3 font-medium [overflow-wrap:anywhere]">{simulation.title}</th>
                    <td className="px-4 py-3 capitalize">{simulation.platform}</td>
                    <td className="px-4 py-3">
                        {/* Solo se enlaza si empieza por http(s), para no pintar un href tipo javascript: */}
                        {/^https?:\/\//i.test(simulation.url)
                            ? <a href={simulation.url} target="_blank" rel="noopener noreferrer"
                                aria-label={`Open ${simulation.title}`}
                                className="text-blue-700 underline">Open</a>
                            : '—'}
                    </td>
                    <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" aria-label={`Edit ${simulation.title}`} onClick={() => onEdit(simulation)} className="rounded px-3 py-1">Edit</Button>
                            <Button variant="danger" aria-label={`Delete ${simulation.title}`} onClick={() => onDelete(simulation)} className="rounded px-3 py-1">Delete</Button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}
