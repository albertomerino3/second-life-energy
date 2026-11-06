import { Request, Response, NextFunction } from "express";
import { ArticleResourceService } from "./article-resource.service.js";

export class ArticleResourceController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const articleResource = await ArticleResourceService.findAll({
                articleId: Number(req.query.articleId) || undefined,
                resourceId: Number(req.query.resourceId) || undefined,
            });
            res.json(articleResource);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try{
            const articleId = Number(req.params.articleId);
            const resourceId = Number(req.params.resourceId);
            const articleResource = await ArticleResourceService.findById(articleId, resourceId);

            if (!articleResource) {
                res.status(404).json({
                    message: "Article Resource not found",
                });
                return;
            }

            res.json(articleResource);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try{
            const { articleId, resourceId } = req.body;
            if (!articleId || !resourceId) {
                res.status(400).json({
                    message: "articleId and resourceId are required",
                });
                return;
            }
            const articleResource = await ArticleResourceService.create({
                articleId,
                resourceId,
            });

            res.status(201).json(articleResource);

        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId = Number(req.params.articleId);
            const resourceId = Number(req.params.resourceId);

            const articleResource = await ArticleResourceService.findById(articleId, resourceId);

            if (!articleResource) {
                res.status(404).json({
                    message: "Article Resource not found",
                });
                return;
            }

            await ArticleResourceService.delete(articleResource);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
