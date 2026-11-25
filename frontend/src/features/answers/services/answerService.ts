import { apiFetch } from "../../../services/api"
import type {
    Answer,
    AnswerFilters,
    AnswerPayload,
    AnswerUpdatePayload,
} from "../types/answer"

function buildQuery(filters: AnswerFilters = {}): string {
    const params = new URLSearchParams()
    if (filters.questionId !== undefined) params.set("questionId", String(filters.questionId))
    const query = params.toString()
    return query ? `?${query}` : ""
}

function jsonOptions(method: "POST" | "PUT", payload: unknown): RequestInit {
    return {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }
}

export const answerService = {
    getAll: (filters: AnswerFilters = {}) =>
        apiFetch<Answer[]>(`/answers${buildQuery(filters)}`),

    getById: (id: number) =>
        apiFetch<Answer>(`/answers/${id}`),

    getByQuestionId: (questionId: number) =>
        apiFetch<Answer[]>(`/answers/question/${questionId}`),

    create: (payload: AnswerPayload) =>
        apiFetch<Answer>("/answers", jsonOptions("POST", payload)),

    update: (id: number, payload: AnswerUpdatePayload) =>
        apiFetch<Answer>(`/answers/${id}`, jsonOptions("PUT", payload)),

    remove: (id: number) =>
        apiFetch<void>(`/answers/${id}`, { method: "DELETE" }),
}
