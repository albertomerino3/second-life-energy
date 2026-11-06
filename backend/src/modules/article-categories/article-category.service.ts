import { ArticleCategory } from "./article-category.model.js";

const includeHierarchy = [
    { model: ArticleCategory, as: "parentCategory", attributes: ["id", "name"] },
    { model: ArticleCategory, as: "subcategories", attributes: ["id", "name"] },
];

export class ArticleCategoryService {
    static async findAll(filters: { rootOnly?: boolean } = {}) {
        return ArticleCategory.findAll({
            where: filters.rootOnly ? { parentCategoryId: null } : {},
            include: includeHierarchy,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return ArticleCategory.findByPk(id, {
            include: includeHierarchy,
        });
    }

    static async create(data: {
        name: string,
        description?: string | null,
        parentCategoryId?: number | null;
    }) {
        return ArticleCategory.create({
            ...data,
            parentCategoryId: data.parentCategoryId ?? null,
        });
    }

    static async update(
        articleCategory: ArticleCategory,
        data: {
            name?: string;
            description?: string | null;
            parentCategoryId?: number | null;
        }
    ) {
        await articleCategory.update(data, {
            fields: ["name", "description", "parentCategoryId"],
        });
        return ArticleCategoryService.findById(articleCategory.id);
    }

    static async delete(articleCategory: ArticleCategory) {
        await articleCategory.destroy();
    }
}
