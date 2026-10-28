import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Resource extends Model<
    InferAttributes<Resource>,
    InferCreationAttributes<Resource>
> {
    declare id: CreationOptional<number>;
    declare authorId: number;
    declare title: string;
    declare description: string;
    declare type: string;
    declare topic: string;
    declare difficulty: string;
    declare url: string;
    declare status: string;
    declare publishedAt: CreationOptional<Date> | null;
    declare createdAt: CreationOptional<Date>;
}
Resource.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        authorId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        topic: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "resources",
        modelName: "Resource",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: false,
    }
);