import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Tag extends Model<
    InferAttributes<Tag>,
    InferCreationAttributes<Tag>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare slug: string;
}

Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { notEmpty: true },
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
        },
    },
    {
        sequelize,
        tableName: "tags",
        modelName: "Tag",
        timestamps: false,
    }
);
