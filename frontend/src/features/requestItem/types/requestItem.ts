export interface RequestItem {
    id : number
    requestId: number
    articleId: number
    quantity: number
    createdAt?: string
    updatedAt?: string
}

export interface RequestItemPayload {
    requestId: number
    articleId: number
    quantity: number
}