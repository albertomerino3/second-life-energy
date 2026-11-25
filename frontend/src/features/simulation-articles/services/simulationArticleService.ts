import { apiFetch } from '../../../services/api'
import type { SimulationArticle, SimulationArticlePayload } from '../types/simulationArticle'

export const simulationArticleService = {
    getAll: () => apiFetch<SimulationArticle[]>('/simulation-articles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: SimulationArticlePayload) => apiFetch<SimulationArticle>('/simulation-articles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    remove: (simulationId: number, articleId: number) => apiFetch<void>(`/simulation-articles/${simulationId}/${articleId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}