// Forma exacta del JSON que devuelve la API. Las fechas llegan como string ISO, no como Date.
// passwordHash no existe aquí: el defaultScope del modelo lo excluye y nunca debe llegar al frontend.
export interface User {
    id: number
    name: string
    email: string
    isActive: boolean
    filename?: string | null
    roles?: { id: number; name: string }[]
    createdAt?: string
    updatedAt?: string
}

// Lo que el formulario envía (como multipart/form-data, por la imagen).
// password es obligatoria al crear; al editar, vacía = mantener la actual. El backend guarda solo el hash.
export interface UserPayload {
    name: string
    email: string
    isActive: boolean
    password?: string
    image?: File
}
