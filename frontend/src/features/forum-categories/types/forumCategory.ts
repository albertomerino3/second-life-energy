import type { QuestionStatus } from "../../questions/types/question"

export interface ForumCategoryQuestionSummary {
    id: number
    title: string
    status: Extract<QuestionStatus, "open" | "solved">
    createdAt: string
}

export interface ForumCategory {
    id: number
    name: string
    description: string | null
    questions?: ForumCategoryQuestionSummary[]
}

export interface ForumCategoryPayload {
    name: string
    description?: string | null
}

export type ForumCategoryUpdatePayload = Partial<ForumCategoryPayload>
