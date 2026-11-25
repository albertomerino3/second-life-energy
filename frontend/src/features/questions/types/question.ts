export const QUESTION_STATUSES = ["open", "solved", "hidden"] as const

export type QuestionStatus = (typeof QUESTION_STATUSES)[number]

export interface QuestionCategorySummary {
    id: number
    name: string
}

export interface QuestionAuthorSummary {
    id: number
    name: string
}

export interface QuestionAnswerSummary {
    id: number
    content: string
    authorId?: number
    status?: string
    createdAt?: string
    author?: QuestionAuthorSummary
}

export interface Question {
    id: number
    categoryId: number
    authorId: number
    acceptedAnswerId: number | null
    title: string
    content: string
    status: QuestionStatus
    createdAt: string
    category?: QuestionCategorySummary
    author?: QuestionAuthorSummary
    acceptedAnswer?: QuestionAnswerSummary | null
    answers?: QuestionAnswerSummary[]
}

export interface QuestionPayload {
    categoryId: number
    authorId: number
    title: string
    content: string
    status?: QuestionStatus
}

export interface QuestionUpdatePayload {
    categoryId?: number
    title?: string
    content?: string
    status?: QuestionStatus
    acceptedAnswerId?: number | null
}

export interface QuestionFilters {
    search?: string
    categoryId?: number
    status?: QuestionStatus
}
