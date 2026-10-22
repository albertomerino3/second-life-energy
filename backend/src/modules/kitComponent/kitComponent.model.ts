import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class KitComponent extends Model<
    InferAttributes<KitComponent>,
    InferCreationAttributes<KitComponent>
> {
    declare id: CreationOptional<number>;
    declare kitId: number;
    declare componentId: number;
    declare quantity: number;
}

KitComponent.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        kitId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        componentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: { min: 1 },
        },
    },
    {
        sequelize,
        tableName: "kit-components",
        modelName: "KitComponent",
        timestamps: true,
    }
);