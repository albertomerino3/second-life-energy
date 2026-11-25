import { ResourceTag } from "./resource-tags.model.js";
import { FindOptions } from "sequelize";

export class ResourceTagService {
    static async findAll() {
        return ResourceTag.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number, options?: FindOptions) {
        return ResourceTag.findByPk(id, options);
    }

    static async create(data: {
        resourceId: number;
        tagId: number;
    }) {
        return ResourceTag.create(data);
    }

    static async update(
        tag: ResourceTag,
        data: {
            resourceId?: number;
            tagId?: number; 
        }
    ) {
        return tag.update(data);
    }

    static async delete(tag: ResourceTag) {
        await tag.destroy();
    }
}