import { Request, Response, NextFunction } from "express";
import { CommentService } from "./comment.service.js";
import { COMMENT_STATUSES } from "./comment.model.js";

export class CommentController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
         try {
            const comments = await CommentService.findAll();
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const comment = await CommentService.findById(id);
            if (!comment) {
                res.status(404).json({
                    message: "Comment not found",
                });
                return;
            }
            res.json(comment);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {  
                articleId,
                userId,
                content,
                rating,
                status, } = req.body;
            if (!articleId || !userId || !content || rating === undefined) {
                res.status(400).json({
                    message: "articleId, userId, content and rating are required",
                });
                return;
            }

            if (status && !COMMENT_STATUSES.includes(status)) {
                res.status(400).json({
                    message: "Invalid status",
                    allowedStatuses: COMMENT_STATUSES,
                });
                return;
            }

            const comment = await CommentService.create({
                articleId,
                userId,
                content,
                rating,
                status,
            });
            res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const comment = await CommentService.findById(id);
            if (!comment) {
                res.status(404).json({
                    message: "Comment not found",
                });
                return;
            }
            const updatedComment = await CommentService.update(
                comment,
                req.body
            );
            res.json(updatedComment );
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const comment = await CommentService.findById(id);
            if (!comment) {
                res.status(404).json({
                    message: "Comment not found",
                });
                return;
            }
            await CommentService.delete(comment);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const status = req.params.status as string;

            if (!COMMENT_STATUSES.includes(status as typeof COMMENT_STATUSES[number])) {
                res.status(400).json({
                    message: "Invalid status",
                    allowedStatuses: COMMENT_STATUSES,
                });
                return;
            }

            const comments = await CommentService.findByStatus(status);

            res.json(comments);

        } catch (error) {
            next(error);
        }
    }

    static async getByArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId = Number(req.params.articleId);

            const comments = await CommentService.findByArticle(articleId);

            res.json(comments);

        } catch (error) {
            next(error);
        }
    }

    static async getByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);

            const comments = await CommentService.findByUser(userId);

            res.json(comments);

        } catch (error) {
            next(error);
        }
    }

    static async getByRating(req: Request, res: Response, next: NextFunction) {
        try {
            const minRating = Number(req.query.min);

            if (!Number.isInteger(minRating) || minRating < 1 || minRating > 5) {
                res.status(400).json({
                    message: "min must be an integer between 1 and 5",
                });
                return;
            }

            const comments = await CommentService.findByRating(minRating);

            res.json(comments);

        } catch (error) {
            next(error);
        }
    }

    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const text = typeof req.query.text === "string"
                ? req.query.text
                : "";

            if (!text.trim()) {
                res.status(400).json({
                    message: "text is required",
                });
                return;
            }

            const comments = await CommentService.searchByContent(text);

            res.json(comments);

        } catch (error) {
            next(error);
        }
    }
}