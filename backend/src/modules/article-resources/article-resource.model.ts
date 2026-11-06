import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
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
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        resourceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "article_resources",
        modelName: "ArticleResource",
        timestamps: false,
    }
);
