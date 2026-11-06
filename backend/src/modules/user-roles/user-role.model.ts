import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// Join table: many-to-many relationship between User and Role
export class UserRole extends Model<
    InferAttributes<UserRole>,
    InferCreationAttributes<UserRole>
> {
    declare userId: number;
    declare roleId: number;
    declare assignedAt: CreationOptional<Date>;
}

UserRole.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        assignedAt: {
            type: DataTypes.DATE,
            allowNull: false,
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
