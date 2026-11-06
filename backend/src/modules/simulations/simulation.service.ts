import { Simulation } from "./simulation.model.js";
import { Article } from "../articles/article.model.js";
import { Resource } from "../resources/resource.model.js";

const includeRelations = [
    { model: Article, as: "articles", attributes: ["id", "name", "type"], through: { attributes: [] } },
    { model: Resource, as: "resources", attributes: ["id", "title", "type", "url"], through: { attributes: [] } },
];

export class SimulationService {
    static async findAll(filters: { platform?: string } = {}) {
        return Simulation.findAll({
            where: filters.platform ? { platform: filters.platform } : {},
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Simulation.findByPk(id, {
            include: includeRelations,
        });
    }

    static async create(data: {
        title: string;
        description: string;
        platform: string;
        url: string;
        objectives: string;
        materials: string;
    }) {
        return Simulation.create(data);
    }

    static async update(
        simulation: Simulation,
        data: {
            title?: string;
            description?: string;
            platform?: string;
            url?: string;
            objectives?: string;
            materials?: string;
        }
    ) {
        await simulation.update(data, {
            fields: ["title", "description", "platform", "url", "objectives", "materials"],
        });
        return SimulationService.findById(simulation.id);
    }

    static async delete(simulation: Simulation) {
        await simulation.destroy();
    }
}
