import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ArticleResource extends Model<
    InferAttributes<ArticleResource>,
    InferCreationAttributes<ArticleResource>
> {
    declare articleId: number;
    declare resourceId: number;
}

ArticleResource.init(
    {
        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        resourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: "article_resources",
        modelName: "ArticleResource",
        timestamps: true,
    }
);