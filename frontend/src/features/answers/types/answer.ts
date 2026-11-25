export const ANSWER_STATUSES = ["published", "hidden"] as const

export type AnswerStatus = (typeof ANSWER_STATUSES)[number]

export interface AnswerAuthorSummary {
    id: number
    name: string
}

export interface AnswerQuestionSummary {
    id: number
    title: string
    status: string
}

export interface Answer {
    id: number
    questionId: number
    authorId: number
    content: string
    status: AnswerStatus
    createdAt: string
    author?: AnswerAuthorSummary
    question?: AnswerQuestionSummary
}

export interface AnswerPayload {
    questionId: number
    authorId: number
    content: string
    status?: AnswerStatus
}

export interface AnswerUpdatePayload {
    content?: string
    status?: AnswerStatus
}

export interface AnswerFilters {
    questionId?: number
}
