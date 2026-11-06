import { Tag } from "./tag.model.js";
import { FindOptions } from "sequelize";
import { Resource } from "../resources/resource.model.js";

export class TagService {
    static async findAll() {
        return Tag.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number, options?: FindOptions) {
        return Tag.findByPk(id, {
            include: [{ model: Resource, as: "resources", attributes: ["id", "title", "type"], through: { attributes: [] } }],
            ...options,
        });
    }

    static async create(data: {
        id?: number;
        name: string;
        slug: string;
    }) {
        return Tag.create(data);
    }

    static async update(
        tag: Tag,
        data: {
            name?: string;
            slug?: string;
        }
    ) {
        return tag.update(data, { fields: ["name", "slug"] });
    }

    static async delete(tag: Tag) {
        await tag.destroy();
    }
}