export interface ArticleResource {
    articleId : number
    resourceId: number
    createdAt?: string
    updatedAt?: string
}

export interface ArticleResourcePayload {
    articleId : number
    resourceId: number
}