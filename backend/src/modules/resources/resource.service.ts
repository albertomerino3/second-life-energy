import { Resource } from "./resource.model.js";

export class ResourceService {
    static async findAll() {
        return Resource.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Resource.findByPk(id);
    }

    static async create(data: {
        authorId: number;
        title: string;
        description: string;
        type: string;
        topic: string;
        difficulty: string;
        url: string;
        status: string;
    }) {
        return Resource.create(data);
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
        }
    ) {
        return resource.update(data);
    }

    static async delete(resource: Resource) {
        await resource.destroy();
    }
}