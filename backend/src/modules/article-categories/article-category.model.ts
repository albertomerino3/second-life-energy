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
    declare name: string | null;
    declare description: string;
    declare parentCategoryId: number;
}

ArticleCategory.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        parentCategoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "article_categories",
        modelName: "ArticleCategory",
        timestamps: true,
    }
);