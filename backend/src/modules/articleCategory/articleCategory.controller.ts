import { Request, Response, NextFunction } from "express";
import { ArticleCategoryService } from "./articleCategory.service.js";
import { ArticleCategory } from "./articleCategory.model.js";

export class ArticleCategoryController {


    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const articleCategory = await ArticleCategory.findAll();
            res.json(articleCategory);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {

        try{
            const id = Number(req.params.id);
            const articleCategory = await ArticleCategoryService.findById(id);

            if (!articleCategory) {
                res.status(404).json({
                    message: "Article Category not found :(",
                });
                return;
            }

            res.json(ArticleCategory);
        } catch (error) {
            next(error);
        }
    }


    static async create(req: Request, res: Response, next: NextFunction) {

        try{
            const { name, description, parentCategoryId} = req.body;
        
        const articleCategory = await ArticleCategoryService.create({
            name,
            description,
            parentCategoryId,
        });
        
        res.status(201).json(articleCategory);

        } catch (error) {
            next(error);
        }
    }


    static async update(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);

            const articleCategory = await ArticleCategoryService.findById(id);

            if (!articleCategory) {
                res.status(404).json({
                    message: "Article Category NOT FOUND",
                });
                return;
            }

            const updateArticleCategory = await ArticleCategoryService.update(
                articleCategory,
                req.body
            );

            res.json(updateArticleCategory);
        } catch (error) {
            next(error);
        }
    }


    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const articleCategory = await ArticleCategoryService.findById(id);

            if (!articleCategory) {
                res.status(404).json({
                    message: "Article Category not found :(",
                });
                return;
            }

            await ArticleCategoryService.delete(articleCategory);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}