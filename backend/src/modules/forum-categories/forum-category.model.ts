import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ForumCategory extends Model<
    InferAttributes<ForumCategory>,
    InferCreationAttributes<ForumCategory>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string | null;
}

ForumCategory.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "forum_categories",
        modelName: "ForumCategory",
        timestamps: false,
    }
);
