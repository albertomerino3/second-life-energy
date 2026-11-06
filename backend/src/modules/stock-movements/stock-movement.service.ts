import { StockMovement } from "./stock-movement.model.js";
import { Article } from "../articles/article.model.js";
import { User } from "../users/user.model.js";

const includeRelations = [
    { model: Article, as: "article", attributes: ["id", "name", "type", "stock"] },
    { model: User, as: "user", attributes: ["id", "name", "email"] },
];

export class StockMovementService {
    static async findAll(filters: { articleId?: number } = {}) {
        return StockMovement.findAll({
            where: filters.articleId ? { articleId: filters.articleId } : {},
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return StockMovement.findByPk(id, {
            include: includeRelations,
        });
    }

    static async create(data: {
        articleId: number;
        userId: number;
        type: string;
        quantity: number;
        reason?: string | null;
    }) {
        return StockMovement.create(data);
    }

    static async update(
        stockMovement: StockMovement,
        data: {
            articleId?: number;
            userId?: number;
            type?: string;
            quantity?: number;
            reason?: string | null;
        }
    ) {
        return stockMovement.update(data, {
            fields: ["articleId", "userId", "type", "quantity", "reason"],
        });
    }

    static async delete(stockMovement: StockMovement) {
        await stockMovement.destroy();
    }
}
