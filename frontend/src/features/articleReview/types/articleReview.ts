// Mismos valores que REVIEW_DECISIONS en el backend.
export const REVIEW_DECISIONS = ['approved', 'returned'] as const
export type ReviewDecision = typeof REVIEW_DECISIONS[number]

export interface ArticleReview {
    id: number
    articleId: number
    reviewerId: number
    decision: ReviewDecision
    comments: string | null
    createdAt?: string
    updatedAt?: string
}

export interface ArticleReviewPayload {
    articleId: number
    reviewerId: number
    decision: ReviewDecision
    comments: string | null
}
