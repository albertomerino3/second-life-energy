import { Op, WhereOptions } from "sequelize";
import { Resource } from "./resource.model.js";
import { User } from "../users/user.model.js";
import { Tag } from "../tags/tag.model.js";
import { Article } from "../articles/article.model.js";
import { Simulation } from "../simulations/simulation.model.js";

export interface ResourceFilters {
    search?: string;
    type?: string;
    topic?: string;
    difficulty?: string;
    status?: string;
    authorId?: number;
    tag?: string;
}

export class ResourceService {
    // HU-07: library filtered by type, topic and difficulty
    static async findAll(filters: ResourceFilters = {}) {
        const where: WhereOptions = {};

        if (filters.search) {
            Object.assign(where, { title: { [Op.iLike]: `%${filters.search}%` } });
        }
        if (filters.type) {
            Object.assign(where, { type: filters.type });
        }
        if (filters.topic) {
            Object.assign(where, { topic: filters.topic });
        }
        if (filters.difficulty) {
            Object.assign(where, { difficulty: filters.difficulty });
        }
        if (filters.status) {
            Object.assign(where, { status: filters.status });
        }
        if (filters.authorId) {
            Object.assign(where, { authorId: filters.authorId });
        }

        return Resource.findAll({
            where,
            include: [
                { model: User, as: "author", attributes: ["id", "name"] },
                {
                    model: Tag,
                    as: "tags",
                    attributes: ["id", "name", "slug"],
                    through: { attributes: [] },
                    // Filter by tag slug (only resources that have that tag)
                    ...(filters.tag ? { where: { slug: filters.tag } } : {}),
                },
            ],
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Resource.findByPk(id, {
            include: [
                { model: User, as: "author", attributes: ["id", "name"] },
                { model: Tag, as: "tags", attributes: ["id", "name", "slug"], through: { attributes: [] } },
                { model: Article, as: "articles", attributes: ["id", "name", "type"], through: { attributes: [] } },
                { model: Simulation, as: "simulations", attributes: ["id", "title", "platform"], through: { attributes: [] } },
            ],
        });
    }

    static async create(data: {
        authorId: number;
        title: string;
        description: string;
        type: string;
        topic: string;
        difficulty: string;
        url: string;
        status?: string;
        publishedAt?: Date | null;
    }) {
        // A published resource always has a publication date
        const publishedAt = data.status === "published" ? data.publishedAt ?? new Date() : data.publishedAt ?? null;
        return Resource.create({ ...data, publishedAt });
    }

    static async update(
        resource: Resource,
        data: {
            authorId?: number;
            title?: string;
            description?: string;
            type?: string;
            topic?: string;
            difficulty?: string;
            url?: string;
            status?: string;
            publishedAt?: Date | null;
        }
    ) {
        const changes = { ...data };
        if (data.status === "published" && !resource.publishedAt && !data.publishedAt) {
            changes.publishedAt = new Date();
        }
        await resource.update(changes, {
            fields: ["authorId", "title", "description", "type", "topic", "difficulty", "url", "status", "publishedAt"],
        });
        return ResourceService.findById(resource.id);
    }

    static async delete(resource: Resource) {
        await resource.destroy();
    }
}
