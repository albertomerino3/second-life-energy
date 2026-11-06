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
    declare kitId: number;
    declare componentId: number;
    declare quantity: CreationOptional<number>;
}

KitComponent.init(
    {
        kitId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        componentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: { isInt: true, min: 1 },
        },
    },
    {
        sequelize,
        tableName: "kit_components",
        modelName: "KitComponent",
        timestamps: false,
    }
);
