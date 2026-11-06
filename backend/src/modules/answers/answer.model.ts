import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const ANSWER_STATUSES = ["published", "hidden"] as const;

export class Answer extends Model<
    InferAttributes<Answer>,
    InferCreationAttributes<Answer>
> {
    declare id: CreationOptional<number>;
    declare questionId: number;
    declare authorId: number;
    declare content: string;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
}

Answer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true },
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "published",
            validate: { isIn: [[...ANSWER_STATUSES]] },
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "answers",
        modelName: "Answer",
        timestamps: true,
        updatedAt: false,
    }
);
