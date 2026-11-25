import { useCallback, useEffect, useState } from 'react'
import { simulationResourceService } from '../services/simulationResourceService'
import type { SimulationResource } from '../types/simulationResource'

export function useSimulationResources() {
    const [simulationResources, setSimulationResources] = useState<SimulationResource[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const reload = useCallback(async () => {
        setLoading(true)
        setError('')
        try { setSimulationResources(await simulationResourceService.getAll()) }
        catch { setError('Could not load simulation resources.') }
        finally { setLoading(false) }
    }, [])

    useEffect(() => {
        let active = true
        void simulationResourceService.getAll().then(data => {
            if (active) setSimulationResources(data)
        }).catch(() => {
            if (active) setError('Could not load simulation resources.')
        }).finally(() => {
            if (active) setLoading(false)
        })
        return () => { active = false }
    }, [])

    return { simulationResources, loading, error, reload }
}