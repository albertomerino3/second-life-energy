import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class SimulationResource extends Model<
    InferAttributes<SimulationResource>,
    InferCreationAttributes<SimulationResource>
> {
    declare simulationId: number;
    declare resourceId: number;
}

SimulationResource.init(
    {
        simulationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        resourceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "simulation_resources",
        modelName: "SimulationResource",
        timestamps: false,
    }
);
