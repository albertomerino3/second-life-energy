// Forma exacta del JSON que devuelve la API. Las fechas llegan como string ISO, no como Date.
// passwordHash no existe aquí: el defaultScope del modelo lo excluye y nunca debe llegar al frontend.
export interface User {
    id: number
    name: string
    email: string
    isActive: boolean
    createdAt?: string
    updatedAt?: string
}

// Lo que el formulario envía. No incluye id, passwordHash ni fechas (los gestiona el backend).
export interface UserPayload {
    name: string
    email: string
    isActive: boolean
}