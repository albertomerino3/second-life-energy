import { apiFetch } from "../../../services/api"
import type {
    Permission,
    PermissionPayload,
    PermissionUpdatePayload,
} from "../types/permission"

function jsonOptions(method: "POST" | "PUT", payload: unknown): RequestInit {
    return {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }
}

export const permissionService = {
    getAll: () =>
        apiFetch<Permission[]>("/permissions"),

    getById: (id: number) =>
        apiFetch<Permission>(`/permissions/${id}`),

    create: (payload: PermissionPayload) =>
        apiFetch<Permission>("/permissions", jsonOptions("POST", payload)),

    update: (id: number, payload: PermissionUpdatePayload) =>
        apiFetch<Permission>(`/permissions/${id}`, jsonOptions("PUT", payload)),

    remove: (id: number) =>
        apiFetch<void>(`/permissions/${id}`, { method: "DELETE" }),
}
