import { Request, Response, NextFunction } from "express";
import { ArticleImageService } from "./article-image.service.js";

export class ArticleImageController {


    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId = Number(req.query.articleId) || undefined;
            const articleImage = await ArticleImageService.findAll({ articleId });
            res.json(articleImage);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {

        try{
            const id = Number(req.params.id);
            const articleImage = await ArticleImageService.findById(id);

            if (!articleImage) {
                res.status(404).json({
                    message: "Article Image not found",
                });
                return;
            }

            res.json(articleImage);
        } catch (error) {
            next(error);
        }
    }


    static async create(req: Request, res: Response, next: NextFunction) {

        try{
            const { articleId, url, altText, sortOrder} = req.body;
            if (!articleId || !url || !altText) {
                res.status(400).json({
                    message: "articleId, url and altText are required",
                });
                return;
            }
        const articleImage = await ArticleImageService.create({
            articleId,
            url,
            altText,
            sortOrder,
        });
        
        res.status(201).json(articleImage);

        } catch (error) {
            next(error);
        }
    }


    static async update(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);

            const articleImage = await ArticleImageService.findById(id);

            if (!articleImage) {
                res.status(404).json({
                    message: "Article Image not found",
                });
                return;
            }

            const updateArticleImage = await ArticleImageService.update(
                articleImage,
                req.body
            );

            res.json(updateArticleImage);
        } catch (error) {
            next(error);
        }
    }


    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const articleImage = await ArticleImageService.findById(id);

            if (!articleImage) {
                res.status(404).json({
                    message: "Article Image not found",
                });
                return;
            }

            await ArticleImageService.delete(articleImage);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}