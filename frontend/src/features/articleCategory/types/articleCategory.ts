export interface ArticleCategory {
    id : number
    name: string
    description: string
    parentCategoryId: number
    createdAt?: string
    updatedAt?: string
}

export interface ArticleCategoryPayload {
    id : number
    name: string
    description: string
    parentCategoryId: number
}