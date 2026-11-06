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
    declare expiresAt: Date;
    declare usedAt: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date>;
}

Invitation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        invitedById: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: { isEmail: true },
        },
        tokenHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: { notEmpty: true },
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: { isDate: true },
        },
        usedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "invitations",
        modelName: "Invitation",
        timestamps: true,
        updatedAt: false,
    }
);
