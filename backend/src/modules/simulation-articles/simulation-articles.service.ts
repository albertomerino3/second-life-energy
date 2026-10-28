import { SimulationArticle } from "./simulation-article.model.js";
import { FindOptions } from "sequelize";

export class SimulationArticleService {
    static async findAll() {
        return SimulationArticle.findAll({
            order: [["simulationId", "ASC"]],
        });
    }

    static async findById(simulationId: number, articleId: number, options?: FindOptions) {
        return SimulationArticle.findOne({
            where: { simulationId, articleId },
            ...options,
        });
    }

    static async create(data: {
        simulationId: number;
        articleId: number;
    }) {
        return SimulationArticle.create(data);
    }

    static async delete(simulationArticle: SimulationArticle) {
        await simulationArticle.destroy();
    }
}