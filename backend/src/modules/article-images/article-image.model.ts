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
    declare sortOrder: CreationOptional<number>;
}

ArticleImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: { notEmpty: true },
        },
        altText: {
            type: DataTypes.STRING(300),
            allowNull: false,
            validate: { notEmpty: true }, // Accessibility: every image needs an alternative text
        },
        sortOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { isInt: true, min: 0 },
        },
    },
    {
        sequelize,
        tableName: "article_images",
        modelName: "ArticleImage",
        timestamps: false,
    }
);
