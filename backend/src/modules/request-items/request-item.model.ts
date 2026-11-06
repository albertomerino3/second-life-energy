import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class RequestItem extends Model<
    InferAttributes<RequestItem>,
    InferCreationAttributes<RequestItem>
> {
    declare id: CreationOptional<number>;
    declare requestId: number;
    declare articleId: number;
    declare quantity: CreationOptional<number>;
}

RequestItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        requestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            // HU-04: max. 1 unit per kit and 10 per component (checked in the service)
            validate: { isInt: true, min: 1, max: 10 },
        },
    },
    {
        sequelize,
        tableName: "request_items",
        modelName: "RequestItem",
        timestamps: false,
    }
);
