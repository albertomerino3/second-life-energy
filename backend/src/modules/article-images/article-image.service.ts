import { ArticleImage } from "./article-image.model.js";

export class ArticleImageService {

    static async findAll() {
        return ArticleImage.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return ArticleImage.findByPk(id);
    }

    static async create(data: {
        articleId: number,
        url: string,
        altText: string,
        sortOrder: number,
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
        return articleImage.update(data);
    }

    static async delete(articleImage: ArticleImage) {
        await articleImage.destroy();
    }
}