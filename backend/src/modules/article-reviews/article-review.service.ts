import { ArticleReview } from "./article-review.model.js";

export class ArticleReviewService {

    static async findAll() {
        return ArticleReview.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return ArticleReview.findByPk(id);
    }

    static async create(data: {
        articleId: number,
        reviewerId: number,
        decision: string,
        comments: string,
    }) {
        return ArticleReview.create(data);
    }

    static async update(
        articleReview: ArticleReview,
        data: {
            articleId?: number;
            reviewerId?: number;
            decision?: string;
            comments?: string;
        }
    ) {
        return articleReview.update(data);
    }

    static async delete(articleReview: ArticleReview) {
        await articleReview.destroy();
    }
}