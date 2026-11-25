import { apiFetch } from "../../../services/api"
import type {
    Question,
    QuestionFilters,
    QuestionPayload,
    QuestionUpdatePayload,
} from "../types/question"

function buildQuery(filters: QuestionFilters = {}): string {
    const params = new URLSearchParams()
    if (filters.search) params.set("search", filters.search)
    if (filters.categoryId !== undefined) params.set("categoryId", String(filters.categoryId))
    if (filters.status) params.set("status", filters.status)
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

export const questionService = {
    getAll: (filters: QuestionFilters = {}) =>
        apiFetch<Question[]>(`/questions${buildQuery(filters)}`),

    getById: (id: number) =>
        apiFetch<Question>(`/questions/${id}`),

    getByCategoryId: (categoryId: number) =>
        apiFetch<Question[]>(`/questions/category/${categoryId}`),

    create: (payload: QuestionPayload) =>
        apiFetch<Question>("/questions", jsonOptions("POST", payload)),

    update: (id: number, payload: QuestionUpdatePayload) =>
        apiFetch<Question>(`/questions/${id}`, jsonOptions("PUT", payload)),

    remove: (id: number) =>
        apiFetch<void>(`/questions/${id}`, { method: "DELETE" }),
}
