// Mismas listas que el backend. Al declararlas `as const`, los tipos se derivan de ellas.
export const RESOURCE_TYPES = ["pdf", "video", "exercise", "quiz", "link"] as const;
export const RESOURCE_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export const RESOURCE_STATUSES = ["draft", "published"] as const;

// Uniones: aquí `type` es la herramienta correcta (una interface no puede expresarlas).
export type ResourceType = typeof RESOURCE_TYPES[number]
export type ResourceDifficulty = typeof RESOURCE_DIFFICULTIES[number]
export type ResourceStatus = typeof RESOURCE_STATUSES[number]

// Forma exacta del JSON que devuelve la API. Las fechas llegan como string ISO, no como Date.
// publishedAt es null mientras el recurso está en borrador.
export interface Resource {
    id: number
    authorId: number
    title: string
    description: string
    type: ResourceType
    topic: string
    difficulty: ResourceDifficulty
    url: string
    status: ResourceStatus
    publishedAt: string | null
    createdAt?: string
}

// Lo que el formulario envía. No incluye id, authorId (lo pone el backend con el usuario autenticado) ni fechas.
export interface ResourcePayload {
    title: string
    description: string
    type: ResourceType
    topic: string
    difficulty: ResourceDifficulty
    url: string
    status: ResourceStatus
}
