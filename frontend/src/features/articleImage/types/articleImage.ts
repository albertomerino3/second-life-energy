export interface ArticleImage {
    id : number
    articleId: number
    url: string
    altText: string
    sortOrder: number
    createdAt?: string
    updatedAt?: string
}

export interface ArticleImagePayload {
    articleId: number
    url: string
    altText: string
    sortOrder: number
}