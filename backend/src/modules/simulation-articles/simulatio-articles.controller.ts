import { Request, Response, NextFunction } from "express";
import { SimulationArticleService } from "./simulation-article.service.js";

export class SimulationArticleController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await SimulationArticleService.findAll();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const simulationId = Number(req.params.simulationId);
            const articleId = Number(req.params.articleId);
            const item = await SimulationArticleService.findById(simulationId, articleId);
            if (!item) {
                res.status(404).json({
                    message: "SimulationArticle not found",
                });
                return;
            }
            res.json(item);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { simulationId, articleId } = req.body;
            if (!simulationId || !articleId) {
                res.status(400).json({
                    message: "simulationId and articleId are required",
                });
                return;
            }
            const item = await SimulationArticleService.create({
                simulationId,
                articleId,
            });
            res.status(201).json(item);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const simulationId = Number(req.params.simulationId);
            const articleId = Number(req.params.articleId);
            const item = await SimulationArticleService.findById(simulationId, articleId);
            if (!item) {
                res.status(404).json({
                    message: "SimulationArticle not found",
                });
                return;
            }
            await SimulationArticleService.delete(item);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}