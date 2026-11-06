import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const ARTICLE_TYPES = ["kit", "component"] as const;
// HU-11: students create drafts and send them to review, teachers approve or return them
export const ARTICLE_STATUSES = ["draft", "in_review", "published", "returned"] as const;

export class Article extends Model<
    InferAttributes<Article>,
    InferCreationAttributes<Article>
> {
    declare id: CreationOptional<number>;
    declare categoryId: number;
    declare createdById: number;
    declare name: string;
    declare description: string;
    declare type: string;
    declare specifications: string | null;
    declare stock: CreationOptional<number>;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Article.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdById: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
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
            validate: { isIn: [[...ARTICLE_TYPES]] },
        },
        specifications: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { isInt: true, min: 0 },
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "draft",
            validate: { isIn: [[...ARTICLE_STATUSES]] },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "articles",
        modelName: "Article",
        timestamps: true,
    }
);
