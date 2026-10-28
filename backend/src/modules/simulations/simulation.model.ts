import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        platform: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        objectives: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        materials: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "simulations",
        modelName: "Simulation",
        timestamps: false,
    }
);