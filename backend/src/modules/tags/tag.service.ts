import { Tag } from "./tag.model.js";
import { FindOptions } from "sequelize";

export class TagService {
    static async findAll() {
        return Tag.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number, options?: FindOptions) {
        return Tag.findByPk(id, options);
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
            name: string;
            slug: string;
        }
    ) {
        return tag.update(data);
    }

    static async delete(tag: Tag) {
        await tag.destroy();
    }
}