// La tabla article_categories no tiene timestamps (timestamps: false en el modelo).
export interface ArticleCategory {
    id: number
    name: string
    description: string | null
    parentCategoryId: number | null
}

export interface ArticleCategoryPayload {
    name: string
    description: string | null
    parentCategoryId: number | null
}
