import { Request, Response, NextFunction } from "express";
import { RequestItemService } from "./request-item.service.js";

export class RequestItemController {


    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const requestId = Number(req.query.requestId) || undefined;
            const requestItem = await RequestItemService.findAll({ requestId });
            res.json(requestItem);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {

        try{
            const id = Number(req.params.id);
            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request Item not found",
                });
                return;
            }

            res.json(requestItem);
        } catch (error) {
            next(error);
        }
    }


    static async create(req: Request, res: Response, next: NextFunction) {

        try{
            const { requestId, articleId, quantity} = req.body;
            if (!requestId || !articleId) {
                res.status(400).json({
                    message: "requestId and articleId are required",
                });
                return;
            }
            const requestItem = await RequestItemService.create({
                requestId,
                articleId,
                quantity,
            });
            res.status(201).json(requestItem);
        } catch (error) {
            next(error);
        }
    }


    static async update(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request Item not found",
                });
                return;
            }

            const updateRequestItem = await RequestItemService.update(
                requestItem,
                req.body
            );

            res.json(updateRequestItem);
        } catch (error) {
            next(error);
        }
    }


    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const requestItem = await RequestItemService.findById(id);

            if (!requestItem) {
                res.status(404).json({
                    message: "Request Item not found",
                });
                return;
            }

            await RequestItemService.delete(requestItem);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}