import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const STOCK_MOVEMENT_TYPES = ["in", "out", "adjustment"] as const;

export class StockMovement extends Model<
    InferAttributes<StockMovement>,
    InferCreationAttributes<StockMovement>
> {
    declare id: CreationOptional<number>;
    declare articleId: number;
    declare userId: number;
    declare type: string;
    declare quantity: number;
    declare reason: string | null;
    declare createdAt: CreationOptional<Date>;
}

StockMovement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: { isIn: [[...STOCK_MOVEMENT_TYPES]] },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { isInt: true, min: 1 },
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "stock_movements",
        modelName: "StockMovement",
        timestamps: true,
        updatedAt: false,
    }
);
