import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";
import { isHttpsUrl } from "../../utils/validators.js";

// HU-07: PDF, videos, exercises, quizzes and external links
export const RESOURCE_TYPES = ["pdf", "video", "exercise", "quiz", "link"] as const;
export const RESOURCE_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
// HU-08: drafts and published resources
export const RESOURCE_STATUSES = ["draft", "published"] as const;

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
    declare status: CreationOptional<string>;
    declare publishedAt: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date>;
}

Resource.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: { isIn: [[...RESOURCE_TYPES]] },
        },
        topic: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { notEmpty: true },
        },
        difficulty: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: { isIn: [[...RESOURCE_DIFFICULTIES]] },
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
            // HU-07: external resources must use HTTPS
            validate: { isHttpsUrl },
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "draft",
            validate: { isIn: [[...RESOURCE_STATUSES]] },
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
        updatedAt: false,
    }
);
