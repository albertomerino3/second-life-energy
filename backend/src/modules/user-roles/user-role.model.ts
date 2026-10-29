import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export class UserRole extends Model {
    declare userId: number;
    declare roleId: number;
    declare assignedAt: Date | null;
}

UserRole.init(
    {
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        assignedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "user_roles",
        modelName: "UserRole",
        timestamps: false,
    }
);