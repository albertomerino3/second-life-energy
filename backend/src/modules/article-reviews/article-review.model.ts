import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ArticleReview extends Model<
    InferAttributes<ArticleReview>,
    InferCreationAttributes<ArticleReview>
> {
    declare id: CreationOptional<number>;
    declare articleId: number;
    declare reviewerId: number;
    declare decision: string;
    declare comments: string;
    declare createdAt: CreationOptional<Date>;
}

ArticleReview.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        reviewerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        decision: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        comments: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        tableName: "article_reviews",
        modelName: "ArticleReview",
        timestamps: true,
    }
);