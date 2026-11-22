import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const COMMENT_STATUSES = ["pending", "approved", "rejected"] as const;

export class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
> {
    declare id: CreationOptional<number>;
    declare articleId: number;
    declare userId: number;
    declare content: string;
    declare rating: number;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
}

Comment.init(
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 5,
            },
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "pending",
            validate: { isIn: [[...COMMENT_STATUSES]] },
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "comments",
        modelName: "Comment",
        timestamps: true,
        updatedAt: false,
    }
);
