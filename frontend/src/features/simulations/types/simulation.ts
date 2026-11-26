// Misma lista que el backend. Al declararla `as const`, el tipo se deriva de ella.
export const SIMULATION_PLATFORMS = ["falstad", "wokwi"] as const;

export type SimulationPlatform = typeof SIMULATION_PLATFORMS[number]

// Forma exacta del JSON que devuelve la API.
export interface Simulation {
    id: number
    title: string
    description: string
    platform: SimulationPlatform
    url: string
    objectives: string
    materials: string
}

// Lo que el formulario envía. No incluye id (lo genera la base de datos).
export interface SimulationPayload {
    title: string
    description: string
    platform: SimulationPlatform
    url: string
    objectives: string
    materials: string
}
