import { SimulationResource } from "./simulation-resource.model.js";
import { FindOptions } from "sequelize";

export class SimulationResourceService {
    static async findAll() {
        return SimulationResource.findAll({
            order: [["simulationId", "ASC"]],
        });
    }

    static async findById(simulationId: number, resourceId: number, options?: FindOptions) {
        return SimulationResource.findOne({
            where: { simulationId, resourceId },
            ...options,
        });
    }

    static async create(data: {
        simulationId: number;
        resourceId: number;
    }) {
        return SimulationResource.create(data);
    }

    static async delete(simulationResource: SimulationResource) {
        await simulationResource.destroy();
    }
}