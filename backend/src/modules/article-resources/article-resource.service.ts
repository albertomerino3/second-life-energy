import { ArticleResource } from "./article-resource.model.js";
import { Article } from "../articles/article.model.js";
import { Resource } from "../resources/resource.model.js";

const includeRelations = [
    { model: Article, as: "article", attributes: ["id", "name", "type"] },
    { model: Resource, as: "resource", attributes: ["id", "title", "type"] },
];

export class ArticleResourceService {

    static async findAll(filters: { articleId?: number; resourceId?: number } = {}) {
        const where: Record<string, number> = {};
        if (filters.articleId) where.articleId = filters.articleId;
        if (filters.resourceId) where.resourceId = filters.resourceId;

        return ArticleResource.findAll({
            where,
            include: includeRelations,
            order: [["articleId", "ASC"], ["resourceId", "ASC"]],
        });
    }

    static async findById(articleId: number, resourceId: number) {
        return ArticleResource.findOne({
            where: { articleId, resourceId },
            include: includeRelations,
        });
    }

    static async create(data: {
        articleId: number,
        resourceId: number,
    }) {
        await ArticleResource.create(data);
        return ArticleResourceService.findById(data.articleId, data.resourceId);
    }

    static async delete(articleResource: ArticleResource) {
        await articleResource.destroy();
    }
}
