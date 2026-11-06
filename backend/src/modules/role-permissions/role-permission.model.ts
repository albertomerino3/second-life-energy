import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// Join table: many-to-many relationship between Role and Permission
export class RolePermission extends Model<
    InferAttributes<RolePermission>,
    InferCreationAttributes<RolePermission>
> {
    declare roleId: number;
    declare permissionId: number;
}

RolePermission.init(
    {
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false, // Foreign key to Role
        },
        permissionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false, // Foreign key to Permission
        },
    },
    {
        sequelize,
        tableName: "role_permissions",
        modelName: "RolePermission",
        timestamps: false,
    }
);
