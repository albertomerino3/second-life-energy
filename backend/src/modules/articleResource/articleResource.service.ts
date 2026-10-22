import { ArticleResource } from "./articleResource.model.js";

export class ArticleResourceService {

    static async findAll() {
        return ArticleResource.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return ArticleResource.findByPk(id);
    }

    static async create(data: {
        articleId: number,
        resourceId: number,
    }) {
        return ArticleResource.create(data);
    }

    static async update(
        articleResource: ArticleResource,
        data: {
            articleId?: number;
            resourceId?: number;
        }
    ) {
        return articleResource.update(data);
    }

    static async delete(articleResource: ArticleResource) {
        await articleResource.destroy();
    }
}