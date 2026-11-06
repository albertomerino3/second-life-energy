import { SimulationResource } from "./simulation-resource.model.js";
import { FindOptions } from "sequelize";
import { Simulation } from "../simulations/simulation.model.js";
import { Resource } from "../resources/resource.model.js";

const includeRelations = [
    { model: Simulation, as: "simulation", attributes: ["id", "title", "platform"] },
    { model: Resource, as: "resource", attributes: ["id", "title", "type"] },
];

export class SimulationResourceService {
    static async findAll(filters: { simulationId?: number; resourceId?: number } = {}) {
        const where: Record<string, number> = {};
        if (filters.simulationId) where.simulationId = filters.simulationId;
        if (filters.resourceId) where.resourceId = filters.resourceId;

        return SimulationResource.findAll({
            where,
            include: includeRelations,
            order: [["simulationId", "ASC"], ["resourceId", "ASC"]],
        });
    }

    static async findById(simulationId: number, resourceId: number, options?: FindOptions) {
        return SimulationResource.findOne({
            where: { simulationId, resourceId },
            include: includeRelations,
            ...options,
        });
    }

    static async create(data: {
        simulationId: number;
        resourceId: number;
    }) {
        await SimulationResource.create(data);
        return SimulationResourceService.findById(data.simulationId, data.resourceId);
    }

    static async delete(simulationResource: SimulationResource) {
        await simulationResource.destroy();
    }
}