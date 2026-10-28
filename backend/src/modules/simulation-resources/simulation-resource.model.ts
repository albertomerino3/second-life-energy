import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export class SimulationResource extends Model {
    declare simulationId: number;
    declare resourceId: number;
}

SimulationResource.init(
    {
        simulationId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        resourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "simulation_resources",
        timestamps: false,
    }
);