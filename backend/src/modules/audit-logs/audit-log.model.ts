import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class AuditLog extends Model<
    InferAttributes<AuditLog>,
    InferCreationAttributes<AuditLog>
> {
    declare id: CreationOptional<number>;
    declare userId: number | null;
    declare entity: string;
    declare entityId: number;
    declare action: string;
    declare previousValues: object | null;
    declare newValues: object | null;
    declare createdAt: CreationOptional<Date>;
}

AuditLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        entity: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { notEmpty: true },
        },
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: { notEmpty: true },
        },
        previousValues: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        newValues: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "audit_logs",
        modelName: "AuditLog",
        timestamps: true,
        updatedAt: false,
    }
);
