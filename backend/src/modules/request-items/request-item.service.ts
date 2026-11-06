import { RequestItem } from "./request-item.model.js";
import { Request } from "../requests/request.model.js";
import { Article } from "../articles/article.model.js";

const includeRelations = [
    { model: Request, as: "request", attributes: ["id", "reference", "status"] },
    { model: Article, as: "article", attributes: ["id", "name", "type", "stock"] },
];

export class RequestItemService {
    static async findAll(filters: { requestId?: number } = {}) {
        return RequestItem.findAll({
            where: filters.requestId ? { requestId: filters.requestId } : {},
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return RequestItem.findByPk(id, {
            include: includeRelations,
        });
    }

    static async create(data: {
        requestId: number,
        articleId: number,
        quantity?: number;
    }) {
        return RequestItem.create(data);
    }

    static async update(
        requestItem: RequestItem,
        data: {
            requestId?: number;
            articleId?: number;
            quantity?: number;
        }
    ) {
        await requestItem.update(data, {
            fields: ["requestId", "articleId", "quantity"],
        });
        return RequestItemService.findById(requestItem.id);
    }

    static async delete(requestItem: RequestItem) {
        await requestItem.destroy();
    }
}
