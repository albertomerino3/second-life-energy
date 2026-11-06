import { ArticleReview } from "./article-review.model.js";
import { Article } from "../articles/article.model.js";
import { User } from "../users/user.model.js";

const includeRelations = [
    { model: Article, as: "article", attributes: ["id", "name", "type", "status"] },
    { model: User, as: "reviewer", attributes: ["id", "name"] },
];

export class ArticleReviewService {
    static async findAll(filters: { articleId?: number; decision?: string } = {}) {
        const where: Record<string, unknown> = {};
        if (filters.articleId) where.articleId = filters.articleId;
        if (filters.decision) where.decision = filters.decision;

        return ArticleReview.findAll({
            where,
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return ArticleReview.findByPk(id, {
            include: includeRelations,
        });
    }

    static async create(data: {
        articleId: number,
        reviewerId: number,
        decision: string,
        comments?: string | null,
    }) {
        return ArticleReview.create(data);
    }

    static async update(
        articleReview: ArticleReview,
        data: {
            articleId?: number;
            reviewerId?: number;
            decision?: string;
            comments?: string | null;
        }
    ) {
        return articleReview.update(data, {
            fields: ["articleId", "reviewerId", "decision", "comments"],
        });
    }

    static async delete(articleReview: ArticleReview) {
        await articleReview.destroy();
    }
}
