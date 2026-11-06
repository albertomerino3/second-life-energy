import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// HU-11: teachers or admins approve a kit or return it with observations
export const REVIEW_DECISIONS = ["approved", "returned"] as const;

export class ArticleReview extends Model<
    InferAttributes<ArticleReview>,
    InferCreationAttributes<ArticleReview>
> {
    declare id: CreationOptional<number>;
    declare articleId: number;
    declare reviewerId: number;
    declare decision: string;
    declare comments: string | null;
    declare createdAt: CreationOptional<Date>;
}

ArticleReview.init(
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
        reviewerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        decision: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: { isIn: [[...REVIEW_DECISIONS]] },
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "article_reviews",
        modelName: "ArticleReview",
        timestamps: true,
        updatedAt: false,
        validate: {
            // Returning a kit requires observations for the student
            commentsWhenReturned(this: ArticleReview) {
                if (this.decision === "returned" && !this.comments) {
                    throw new Error("comments are required when the decision is 'returned'");
                }
            },
        },
    }
);
