import { apiFetch } from '../../../services/api'
import type { Simulation, SimulationPayload } from '../types/simulation.js'

const json = { 'Content-Type': 'application/json' }

export const simulationService = {
    getAll: () => apiFetch<Simulation[]>('/simulations', { method: 'GET' }),

    getById: (id: number) => apiFetch<Simulation>(`/simulations/${id}`, { method: 'GET' }),

    create: (payload: SimulationPayload) => apiFetch<Simulation>('/simulations', {
        headers: json,
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    update: (id: number, payload: SimulationPayload) => apiFetch<Simulation>(`/simulations/${id}`, {
        headers: json,
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    remove: (id: number) => apiFetch<void>(`/simulations/${id}`, { method: 'DELETE' }),
}
