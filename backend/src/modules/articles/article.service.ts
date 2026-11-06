import { Op, WhereOptions, Order } from "sequelize";
import { Article } from "./article.model.js";
import { ArticleCategory } from "../article-categories/article-category.model.js";
import { ArticleImage } from "../article-images/article-image.model.js";
import { User } from "../users/user.model.js";
import { Resource } from "../resources/resource.model.js";
import { Simulation } from "../simulations/simulation.model.js";

export interface ArticleFilters {
    search?: string;
    categoryId?: number;
    type?: string;
    status?: string;
    available?: boolean;
    sort?: string;
    order?: string;
}

const SORTABLE_FIELDS = ["id", "name", "stock", "createdAt"];

export class ArticleService {
    // HU-03: catalogue with search, filters and sorting
    static async findAll(filters: ArticleFilters = {}) {
        const where: WhereOptions = {};

        if (filters.search) {
            Object.assign(where, {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${filters.search}%` } },
                    { description: { [Op.iLike]: `%${filters.search}%` } },
                ],
            });
        }
        if (filters.categoryId) {
            Object.assign(where, { categoryId: filters.categoryId });
        }
        if (filters.type) {
            Object.assign(where, { type: filters.type });
        }
        if (filters.status) {
            Object.assign(where, { status: filters.status });
        }
        if (filters.available !== undefined) {
            Object.assign(where, { stock: filters.available ? { [Op.gt]: 0 } : 0 });
        }

        const sortField = filters.sort && SORTABLE_FIELDS.includes(filters.sort) ? filters.sort : "id";
        const sortOrder = filters.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
        const order: Order = [
            [sortField, sortOrder],
            [{ model: ArticleImage, as: "images" }, "sortOrder", "ASC"],
        ];

        return Article.findAll({
            where,
            include: [
                { model: ArticleCategory, as: "category", attributes: ["id", "name"] },
                { model: ArticleImage, as: "images", attributes: ["id", "url", "altText", "sortOrder"] },
            ],
            order,
        });
    }

    // HU-03: article page with images, specifications, components and related resources
    static async findById(id: number) {
        return Article.findByPk(id, {
            include: [
                {
                    model: ArticleCategory,
                    as: "category",
                    attributes: ["id", "name"],
                    include: [{ model: ArticleCategory, as: "parentCategory", attributes: ["id", "name"] }],
                },
                { model: User, as: "createdBy", attributes: ["id", "name"] },
                { model: ArticleImage, as: "images", attributes: ["id", "url", "altText", "sortOrder"] },
                {
                    model: Article,
                    as: "components",
                    attributes: ["id", "name", "type", "stock"],
                    through: { attributes: ["quantity"] },
                },
                {
                    model: Article,
                    as: "kits",
                    attributes: ["id", "name", "type", "stock"],
                    through: { attributes: ["quantity"] },
                },
                {
                    model: Resource,
                    as: "resources",
                    attributes: ["id", "title", "type", "url"],
                    through: { attributes: [] },
                },
                {
                    model: Simulation,
                    as: "simulations",
                    attributes: ["id", "title", "platform", "url"],
                    through: { attributes: [] },
                },
            ],
            order: [[{ model: ArticleImage, as: "images" }, "sortOrder", "ASC"]],
        });
    }

    static async create(data: {
        categoryId: number;
        createdById: number;
        name: string;
        description: string;
        type: string;
        specifications?: string | null;
        stock?: number;
        status?: string;
    }) {
        return Article.create(data);
    }

    static async update(
        article: Article,
        data: {
            categoryId?: number;
            createdById?: number;
            name?: string;
            description?: string;
            type?: string;
            specifications?: string | null;
            stock?: number;
            status?: string;
        }
    ) {
        await article.update(data, {
            fields: ["categoryId", "createdById", "name", "description", "type", "specifications", "stock", "status"],
        });
        return ArticleService.findById(article.id);
    }

    static async delete(article: Article) {
        await article.destroy();
    }
}
