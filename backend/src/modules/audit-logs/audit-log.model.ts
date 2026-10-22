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
    declare userId: CreationOptional<number> | null;
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
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: "users",
                key: "id",
            },
        },
        entity: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        entityId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING(150),
            allowNull: false,
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
        createdAt: "createdAt",
        updatedAt: false,
    }
);