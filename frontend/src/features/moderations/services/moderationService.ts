import { apiFetch } from "../../../services/api"
import type {
    Moderation,
    ModerationFilters,
    ModerationPayload,
    ModerationUpdatePayload,
} from "../types/moderation"

function buildQuery(filters: ModerationFilters = {}): string {
    const params = new URLSearchParams()
    if (filters.questionId !== undefined) params.set("questionId", String(filters.questionId))
    if (filters.answerId !== undefined) params.set("answerId", String(filters.answerId))
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

export const moderationService = {
    getAll: (filters: ModerationFilters = {}) =>
        apiFetch<Moderation[]>(`/moderations${buildQuery(filters)}`),

    getById: (id: number) =>
        apiFetch<Moderation>(`/moderations/${id}`),

    create: (payload: ModerationPayload) =>
        apiFetch<Moderation>("/moderations", jsonOptions("POST", payload)),

    update: (id: number, payload: ModerationUpdatePayload) =>
        apiFetch<Moderation>(`/moderations/${id}`, jsonOptions("PUT", payload)),

    remove: (id: number) =>
        apiFetch<void>(`/moderations/${id}`, { method: "DELETE" }),
}
