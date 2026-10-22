import { Request, Response, NextFunction } from "express";
import { RequestItemService } from "./requestItem.service.js";
import { RequestItem } from "./requestItem.model.js";

export class RequestItemController {


    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const requestItem = await RequestItemService.findAll();
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
                    message: "Request Item not found :(",
                });
                return;
            }

            res.json(RequestItem);
        } catch (error) {
            next(error);
        }
    }


    static async create(req: Request, res: Response, next: NextFunction) {

        try{
            const { requestId, articleId, quantity} = req.body;
        
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
                    message: "Request Item NOT FOUND",
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
                    message: "Request Item not found :(",
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