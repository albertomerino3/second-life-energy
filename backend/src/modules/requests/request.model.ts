import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const REQUEST_STATUSES = ["draft", "confirmed", "cancelled"] as const;

export class Request extends Model<
    InferAttributes<Request>,
    InferCreationAttributes<Request>
> {
    declare id: CreationOptional<number>;
    declare reference: string;
    declare contactName: string;
    declare contactEmail: string;
    declare notes: string | null;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
}

Request.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        reference: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: { is: /^DEMO-\d{4}-[A-Z0-9]+$/ },
        },
        contactName: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: { notEmpty: true },
        },
        contactEmail: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: { isEmail: true },
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "draft",
            validate: { isIn: [[...REQUEST_STATUSES]] },
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "requests",
        modelName: "Request",
        timestamps: true,
        updatedAt: false,
    }
);
