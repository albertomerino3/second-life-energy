import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const MODERATION_ACTIONS = ["hide", "restore"] as const;

export class Moderation extends Model<
    InferAttributes<Moderation>,
    InferCreationAttributes<Moderation>
> {
    declare id: CreationOptional<number>;
    declare moderatorId: number;
    declare questionId: number | null;
    declare answerId: number | null;
    declare action: string;
    declare reason: string;
    declare createdAt: CreationOptional<Date>;
}

Moderation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        moderatorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        answerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        action: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: { isIn: [[...MODERATION_ACTIONS]] },
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: { notEmpty: true },
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "moderations",
        modelName: "Moderation",
        timestamps: true,
        updatedAt: false,
        validate: {
            exactlyOneTarget(this: Moderation) {
                const hasQuestion = this.questionId !== null && this.questionId !== undefined;
                const hasAnswer = this.answerId !== null && this.answerId !== undefined;
                if (hasQuestion === hasAnswer) {
                    throw new Error("Either questionId or answerId must be provided (not both)");
                }
            },
        },
    }
);
