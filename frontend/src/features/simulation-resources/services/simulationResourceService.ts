import { apiFetch } from '../../../services/api'
import type { SimulationResource, SimulationResourcePayload } from '../types/simulationResource'

export const simulationResourceService = {
    getAll: () => apiFetch<SimulationResource[]>('/simulation-resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: SimulationResourcePayload) => apiFetch<SimulationResource>('/simulation-resources', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    remove: (simulationId: number, resourceId: number) => apiFetch<void>(`/simulation-resources/${simulationId}/${resourceId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}