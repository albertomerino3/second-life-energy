export interface ArticleReview {
    id: number
    articleId: number
    reviewerId: number
    decision: string
    comments: string
    createdAt?: string
    updatedAt?: string
}

export interface ArticleReviewPayload {
    articleId : number
    reviewerId: number
    decision: string
    comments: string
}