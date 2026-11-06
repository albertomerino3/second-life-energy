import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ArticleCategory extends Model<
    InferAttributes<ArticleCategory>,
    InferCreationAttributes<ArticleCategory>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string | null;
    declare parentCategoryId: number | null;
}

ArticleCategory.init(
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
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        parentCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "article_categories",
        modelName: "ArticleCategory",
        timestamps: false,
    }
);
