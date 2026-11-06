import { SimulationArticle } from "./simulation-article.model.js";
import { FindOptions } from "sequelize";
import { Simulation } from "../simulations/simulation.model.js";
import { Article } from "../articles/article.model.js";

const includeRelations = [
    { model: Simulation, as: "simulation", attributes: ["id", "title", "platform"] },
    { model: Article, as: "article", attributes: ["id", "name", "type"] },
];

export class SimulationArticleService {
    static async findAll(filters: { simulationId?: number; articleId?: number } = {}) {
        const where: Record<string, number> = {};
        if (filters.simulationId) where.simulationId = filters.simulationId;
        if (filters.articleId) where.articleId = filters.articleId;

        return SimulationArticle.findAll({
            where,
            include: includeRelations,
            order: [["simulationId", "ASC"], ["articleId", "ASC"]],
        });
    }

    static async findById(simulationId: number, articleId: number, options?: FindOptions) {
        return SimulationArticle.findOne({
            where: { simulationId, articleId },
            include: includeRelations,
            ...options,
        });
    }

    static async create(data: {
        simulationId: number;
        articleId: number;
    }) {
        await SimulationArticle.create(data);
        return SimulationArticleService.findById(data.simulationId, data.articleId);
    }

    static async delete(simulationArticle: SimulationArticle) {
        await simulationArticle.destroy();
    }
}