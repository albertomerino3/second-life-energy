import { ResourceTag } from "./resource-tag.model.js";
import { Resource } from "../resources/resource.model.js";
import { Tag } from "../tags/tag.model.js";

const includeRelations = [
    { model: Resource, as: "resource", attributes: ["id", "title", "type"] },
    { model: Tag, as: "tag", attributes: ["id", "name", "slug"] },
];

export class ResourceTagService {
    static async findAll(filters: { resourceId?: number; tagId?: number } = {}) {
        const where: Record<string, number> = {};
        if (filters.resourceId) where.resourceId = filters.resourceId;
        if (filters.tagId) where.tagId = filters.tagId;

        return ResourceTag.findAll({
            where,
            include: includeRelations,
            order: [["resourceId", "ASC"], ["tagId", "ASC"]],
        });
    }

    static async findById(resourceId: number, tagId: number) {
        return ResourceTag.findOne({
            where: { resourceId, tagId },
            include: includeRelations,
        });
    }

    static async create(data: {
        resourceId: number;
        tagId: number;
    }) {
        await ResourceTag.create(data);
        return ResourceTagService.findById(data.resourceId, data.tagId);
    }

    static async delete(resourceTag: ResourceTag) {
        await resourceTag.destroy();
    }
}
