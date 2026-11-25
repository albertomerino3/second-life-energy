export const MODERATION_ACTIONS = ["hide", "restore"] as const

export type ModerationAction = (typeof MODERATION_ACTIONS)[number]

export interface ModerationUserSummary {
    id: number
    name: string
}

export interface ModerationQuestionSummary {
    id: number
    title: string
    status: string
    authorId: number
}

export interface ModerationAnswerSummary {
    id: number
    content: string
    status: string
    authorId: number
}

export interface Moderation {
    id: number
    moderatorId: number
    questionId: number | null
    answerId: number | null
    action: ModerationAction
    reason: string
    createdAt: string
    moderator?: ModerationUserSummary
    question?: ModerationQuestionSummary | null
    answer?: ModerationAnswerSummary | null
}

export interface ModerationPayload {
    moderatorId: number
    questionId?: number | null
    answerId?: number | null
    action: ModerationAction
    reason: string
}

export interface ModerationUpdatePayload {
    reason?: string
}

export interface ModerationFilters {
    questionId?: number
    answerId?: number
}
