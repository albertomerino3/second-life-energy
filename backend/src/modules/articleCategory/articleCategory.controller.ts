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
            const articleCategory = await ArticleCategory.findById(id);

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
            const { kitId, componentId, quantity} = req.body;
        
        const kitComponent = await KitComponentService.create({
            kitId,
            componentId,
            quantity,
        });
        
        res.status(201).json(kitComponent);

        } catch (error) {
            next(error);
        }
    }


    static async update(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);

            const kitComponent = await KitComponentService.findById(id);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit Component NOT FOUND",
                });
                return;
            }

            const updateKitComponent = await KitComponentService.update(
                kitComponent,
                req.body
            );

            res.json(updateKitComponent);
        } catch (error) {
            next(error);
        }
    }


    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const kitComponent = await KitComponentService.findById(id);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit Component not found :(",
                });
                return;
            }

            await KitComponentService.delete(kitComponent);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}