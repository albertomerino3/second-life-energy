// Mismas listas que el backend. Al declararlas `as const`, los tipos se derivan de ellas.
export const ARTICLE_TYPES = ['kit', 'component'] as const
export const ARTICLE_STATUSES = ['draft', 'in_review', 'published', 'returned'] as const

// Uniones: aquí `type` es la herramienta correcta (una interface no puede expresarlas).
export type ArticleType = typeof ARTICLE_TYPES[number]
export type ArticleStatus = typeof ARTICLE_STATUSES[number]

// Forma exacta del JSON que devuelve la API. Las fechas llegan como string ISO, no como Date.
export interface Article {
    id: number
    categoryId: number
    createdById: number
    name: string
    description: string
    type: ArticleType
    specifications: string | null
    stock: number
    status: ArticleStatus
    createdAt: string
    updatedAt: string
}

// Lo que la UI necesita para pintar la lista: el artículo + el nombre de su categoría.
export interface ArticleListItem extends Article {
    categoryName: string
}

// Lo que el formulario envía. No incluye id, createdById (lo pone el backend), status ni fechas.
export interface ArticlePayload {
    categoryId: number
    name: string
    description: string
    type: ArticleType
    specifications: string | null
    stock: number
}

export interface CategoryOption {
    id: number
    name: string
}