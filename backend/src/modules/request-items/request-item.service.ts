import { RequestItem } from "./request-item.model.js";
import { Request } from "../requests/request.model.js";
import { Article } from "../articles/article.model.js";
import { HttpError } from "../../utils/http-error.js";

const includeRelations = [
    { model: Request, as: "request", attributes: ["id", "reference", "status"] },
    { model: Article, as: "article", attributes: ["id", "name", "type", "stock"] },
];

// HU-04: max. 1 unit per kit and 10 per component
const MAX_UNITS = { kit: 1, component: 10 } as const;

async function checkAvailability(articleId: number, quantity: number) {
    const article = await Article.findByPk(articleId);
    if (!article) {
        throw new HttpError(404, "Article not found");
    }
    // HU-03: out of stock articles are visible but cannot be requested
    if (article.stock === 0) {
        throw new HttpError(409, "The article is out of stock and cannot be requested");
    }
    const maxUnits = MAX_UNITS[article.type as keyof typeof MAX_UNITS];
    if (quantity > maxUnits) {
        throw new HttpError(400, `A ${article.type} can be requested up to ${maxUnits} unit(s)`);
    }
    if (quantity > article.stock) {
        throw new HttpError(409, `Only ${article.stock} unit(s) available`);
    }
}

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
        await checkAvailability(data.articleId, data.quantity ?? 1);
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
        if (data.articleId !== undefined || data.quantity !== undefined) {
            await checkAvailability(data.articleId ?? requestItem.articleId, data.quantity ?? requestItem.quantity);
        }
        await requestItem.update(data, {
            fields: ["requestId", "articleId", "quantity"],
        });
        return RequestItemService.findById(requestItem.id);
    }

    static async delete(requestItem: RequestItem) {
        await requestItem.destroy();
    }
}
