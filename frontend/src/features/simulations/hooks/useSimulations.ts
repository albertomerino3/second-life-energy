import { useCallback, useEffect, useState } from 'react'
import { simulationService } from '../services/simulationService.js'
import type { Simulation, SimulationPayload } from '../types/simulation.js'

export function useSimulations() {
    const [simulations, setSimulations] = useState<Simulation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        try {
            setError('')
            setSimulations(await simulationService.getAll())
        } catch {
            setError('Could not load simulations.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { void load() }, [load])

    // Guardar y borrar lanzan el error: el diálogo que los llama lo muestra junto al formulario.
    async function saveSimulation(id: number | null, payload: SimulationPayload) {
        if (id === null) await simulationService.create(payload)
        else await simulationService.update(id, payload)
        await load()
    }

    async function deleteSimulation(id: number) {
        await simulationService.remove(id)
        await load()
    }

    return { simulations, loading, error, reload: load, saveSimulation, deleteSimulation }
}
