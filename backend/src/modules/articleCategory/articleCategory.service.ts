import { ArticleCategory } from "./articleCategory.model.js";

export class ArticleCategoryService {

    static async findAll() {
        return ArticleCategory.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return ArticleCategory.findByPk(id);
    }

    static async create(data: {
        name: string,
        description: string,
        parentCategoryId: number;
    }) {
        return ArticleCategory.create(data);
    }

    static async update(
        articleCategory: ArticleCategory,
        data: {
            name?: string;
            description?: string;
            parentCategoryId?: number;
        }
    ) {
        return articleCategory.update(data);
    }

    static async delete(articleCategory: ArticleCategory) {
        await articleCategory.destroy();
    }
}