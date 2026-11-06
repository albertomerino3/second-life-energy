import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Permission extends Model<
    InferAttributes<Permission>,
    InferCreationAttributes<Permission>
> {
    declare id: CreationOptional<number>;
    declare code: string;
    declare description: string | null;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { notEmpty: true },
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "permissions",
        modelName: "Permission",
        timestamps: false,
    }
);
