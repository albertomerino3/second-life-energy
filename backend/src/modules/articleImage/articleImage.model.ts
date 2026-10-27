import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ArticleImage extends Model<
    InferAttributes<ArticleImage>,
    InferCreationAttributes<ArticleImage>
> {
    declare id: CreationOptional<number>;
    declare articleId: number;
    declare url: string;
    declare altText: string;
    declare sortOrder: number;
}

ArticleImage.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        altText: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        sortOrder: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "article-images",
        modelName: "ArticleImage",
        timestamps: true,
    }
);