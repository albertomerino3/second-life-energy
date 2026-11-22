import {Op} from "sequelize";

import { Comment } from "./comment.model.js";
import { Article } from "../articles/article.model.js";
import { User } from "../users/user.model.js";


const includeRelations = [
    { model: User, as: "user", attributes: ["id", "name", "email"] },
    { model: Article, as: "article", attributes: ["id", "name", "type", "status"] },
];

export class CommentService {
    static async findAll() {
        return Comment.findAll({
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Comment.findByPk(id, {
            include: includeRelations,
        });
    }

    static async create(data: {
        articleId: number;
        userId: number;
        content: string;
        rating: number;
        status?: string;
    }) {
        return Comment.create(data);
    }

    static async update(comment: Comment, data: {
        articleId?: number;
        userId?: number;
        content?: string;
        rating?: number;
        status?: string;
    }) {
        return comment.update(data, {
            fields: [
                "articleId",
                "userId",
                "content",
                "rating",
                "status",
            ]
        });
    }

    static async delete(comment: Comment) {
        await comment.destroy();
    }

    //Search by status
    static async findByStatus(status: string) {
        return Comment.findAll({
            where: {
                status,
            },
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    //Search by article
    static async findByArticle(articleId: number) {
        return Comment.findAll({
            where: {
                articleId,
            },
            include: includeRelations,
            order: [["createdAt", "DESC"]],
        });
    }

    //Search by user
    static async findByUser(userId: number) {
        return Comment.findAll({
            where: {
                userId,
            },
            include: includeRelations,
        });
    }

    //Search by rating > x
    static async findByRating(minRating: number) {
        return Comment.findAll({
            where: {
                rating: {
                    [Op.gt]: minRating,
                },
            },
            include: includeRelations,
        });
    }

    //Search by rating between 2 
    static async findByRatingRange(min: number, max: number) {
        return Comment.findAll({
            where: {
                rating: {
                    [Op.between]: [min, max],
                },
            },
            include: includeRelations,
        });
    }

    //Search by approved articles
    static async findApprovedByArticle(articleId: number) {
        return Comment.findAll({
            where: {
                articleId,
                status: "approved",
            },
            include: includeRelations,
        });
    }

    //Search by content
    static async searchByContent(text: string) {
        return Comment.findAll({
            where: {
                content: {
                    [Op.iLike]: `%${text}%`,
                },
            },
            include: includeRelations,
        });
    }
}
