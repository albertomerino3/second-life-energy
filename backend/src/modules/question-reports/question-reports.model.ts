import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export const REPORT_STATUSES = ["pending", "approved", "rejected"] as const;

export class QuestionReport extends Model<
    InferAttributes<QuestionReport>,
    InferCreationAttributes<QuestionReport>
> {
    declare id: CreationOptional<number>;
    declare questionId: number;
    declare reason: string;
    declare status: CreationOptional<string>;
    declare severity: number;
    declare createdAt: CreationOptional<Date>;
}

QuestionReport.init(
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
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true },
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "pending",
            validate: { isIn: [[...REPORT_STATUSES]] },
        },
        severity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
        },

        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "question_reports",
        modelName: "QuestionReport",
        timestamps: true,
        updatedAt: false,
    }
);
