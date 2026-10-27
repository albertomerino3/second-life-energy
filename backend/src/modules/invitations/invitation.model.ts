import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Invitation extends Model<
    InferAttributes<Invitation>,
    InferCreationAttributes<Invitation>
> {
    declare id: CreationOptional<number>;
    declare invitedById: number;
    declare roleId: number;
    declare email: string;
    declare tokenHash: string;
    declare expiresAt: CreationOptional<Date>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
Invitation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        invitedById: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        tokenHash: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        expiresAt: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "invitations",
        modelName: "Invitation",
        timestamps: true,
    }
);