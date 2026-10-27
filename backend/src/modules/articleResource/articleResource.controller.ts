import { Request, Response, NextFunction } from "express";
import { ArticleResourceService } from "./articleResource.service.js";

export class ArticleResourceController {


    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const articleResource = await ArticleResourceService.findAll();
            res.json(articleResource);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {

        try{
            const id = Number(req.params.id);
            const articleResource = await ArticleResourceService.findById(id);

            if (!articleResource) {
                res.status(404).json({
                    message: "Article Resource not found :(",
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
            const { articleId, resourceId} = req.body;
            if (!articleId || !resourceId) {
                res.status(400).json({
                    message: "articleId and resourceId are required",
                });
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


    static async update(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);

            const articleResource = await ArticleResourceService.findById(id);

            if (!articleResource) {
                res.status(404).json({
                    message: "Article Resource NOT FOUND",
                });
                return;
            }

            const updateArticleResource = await ArticleResourceService.update(
                articleResource,
                req.body
            );

            res.json(updateArticleResource);
        } catch (error) {
            next(error);
        }
    }


    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const articleResource = await ArticleResourceService.findById(id);

            if (!articleResource) {
                res.status(404).json({
                    message: "Article Resource not found :(",
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