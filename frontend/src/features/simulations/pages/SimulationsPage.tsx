import { useState } from 'react'
import Button from '../../../components/ui/Button'
import SimulationList from '../components/SimulationList'
import SimulationFormDialog from '../components/SimulationFormDialog'
import SimulationDeleteDialog from '../components/SimulationDeleteDialog'
import { useSimulations } from '../hooks/useSimulations.js'
import type { Simulation } from '../types/simulation.js'

function SimulationsPage() {
    const { simulations, loading, error, reload, saveSimulation, deleteSimulation } = useSimulations()
    const [formOpen, setFormOpen] = useState(false)
    const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null)
    const [simulationToDelete, setSimulationToDelete] = useState<Simulation | null>(null)

    function openForm(simulation: Simulation | null) {
        setSelectedSimulation(simulation)
        setFormOpen(true)
    }

    return (
        <main className="mx-auto max-w-6xl p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold">Simulation list</h1>
                <Button onClick={() => openForm(null)} disabled={loading}
                    className="rounded px-4 py-2 disabled:opacity-50">New simulation</Button>
            </div>

            {error && (
                <div className="mb-4">
                    <p role="alert" className="text-red-600">{error}</p>
                    <Button variant="secondary" disabled={loading}
                        onClick={() => void reload()} className="mt-2 rounded px-4 py-2">
                        Reload
                    </Button>
                </div>
            )}

            {loading ? (
                <p role="status">Loading simulations...</p>
            ) : simulations.length === 0 ? (
                !error && <p>No simulations available.</p>
            ) : (
                <SimulationList simulations={simulations} onEdit={openForm} onDelete={setSimulationToDelete} />
            )}
            {formOpen && <SimulationFormDialog simulation={selectedSimulation}
                onSave={payload => saveSimulation(selectedSimulation?.id ?? null, payload)}
                onClose={() => setFormOpen(false)} />}
            {simulationToDelete && <SimulationDeleteDialog simulation={simulationToDelete}
                onConfirm={() => deleteSimulation(simulationToDelete.id)}
                onClose={() => setSimulationToDelete(null)} />}
        </main>
    )
}

export default SimulationsPage
