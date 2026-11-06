import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const QUESTION_STATUSES = ["open", "solved", "hidden"] as const;

export class Question extends Model<
    InferAttributes<Question>,
    InferCreationAttributes<Question>
> {
    declare id: CreationOptional<number>;
    declare categoryId: number;
    declare authorId: number;
    declare acceptedAnswerId: CreationOptional<number | null>;
    declare title: string;
    declare content: string;
    declare status: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false, // Foreign key to ForumCategory
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false, // Foreign key to User (creator)
        },
        acceptedAnswerId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Foreign key to Answer chosen as solution
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: { notEmpty: true },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true },
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "open",
            validate: { isIn: [[...QUESTION_STATUSES]] },
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "questions",
        modelName: "Question",
        timestamps: true,
        updatedAt: false,
    }
);
