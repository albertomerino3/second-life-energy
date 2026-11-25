import { apiFetch } from "../../../services/api"
import type {
    ForumCategory,
    ForumCategoryPayload,
    ForumCategoryUpdatePayload,
} from "../types/forumCategory"

function jsonOptions(method: "POST" | "PUT", payload: unknown): RequestInit {
    return {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }
}

export const forumCategoryService = {
    getAll: () =>
        apiFetch<ForumCategory[]>("/forum-categories"),

    getById: (id: number) =>
        apiFetch<ForumCategory>(`/forum-categories/${id}`),

    create: (payload: ForumCategoryPayload) =>
        apiFetch<ForumCategory>("/forum-categories", jsonOptions("POST", payload)),

    update: (id: number, payload: ForumCategoryUpdatePayload) =>
        apiFetch<ForumCategory>(`/forum-categories/${id}`, jsonOptions("PUT", payload)),

    remove: (id: number) =>
        apiFetch<void>(`/forum-categories/${id}`, { method: "DELETE" }),
}
