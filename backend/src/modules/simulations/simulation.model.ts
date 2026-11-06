import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const SIMULATION_PLATFORMS = ["falstad", "wokwi"] as const;

export class Simulation extends Model<
    InferAttributes<Simulation>,
    InferCreationAttributes<Simulation>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare platform: string;
    declare url: string;
    declare objectives: string;
    declare materials: string;
}

Simulation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: { notEmpty: true },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true },
        },
        platform: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: { isIn: [[...SIMULATION_PLATFORMS]] },
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        objectives: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true },
        },
        materials: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    {
        sequelize,
        tableName: "simulations",
        modelName: "Simulation",
        timestamps: false,
    }
);
