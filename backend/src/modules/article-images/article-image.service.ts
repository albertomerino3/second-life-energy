import { ArticleImage } from "./article-image.model.js";
import { Article } from "../articles/article.model.js";

const includeArticle = [{ model: Article, as: "article", attributes: ["id", "name"] }];

export class ArticleImageService {

    static async findAll(filters: { articleId?: number } = {}) {
        return ArticleImage.findAll({
            where: filters.articleId ? { articleId: filters.articleId } : {},
            include: includeArticle,
            order: [["articleId", "ASC"], ["sortOrder", "ASC"]],
        });
    }

    static async findById(id: number) {
        return ArticleImage.findByPk(id, {
            include: includeArticle,
        });
    }

    static async create(data: {
        articleId: number,
        url: string,
        altText: string,
        sortOrder?: number,
    }) {
        return ArticleImage.create(data);
    }

    static async update(
        articleImage: ArticleImage,
        data: {
            articleId?: number;
            url?: string;
            altText?: string;
            sortOrder?: number,
        }
    ) {
        return articleImage.update(data, {
            fields: ["articleId", "url", "altText", "sortOrder"],
        });
    }

    static async delete(articleImage: ArticleImage) {
        await articleImage.destroy();
    }
}
