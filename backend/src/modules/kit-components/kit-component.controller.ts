import { Request, Response, NextFunction } from "express";
import { KitComponentService } from "./kit-component.service.js";

export class KitComponentController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const kitId = Number(req.query.kitId) || undefined;
            const kitComponent = await KitComponentService.findAll({ kitId });
            res.json(kitComponent);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try{
            const kitId = Number(req.params.kitId);
            const componentId = Number(req.params.componentId);
            const kitComponent = await KitComponentService.findById(kitId, componentId);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit Component not found",
                });
                return;
            }

            res.json(kitComponent);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try{
            const { kitId, componentId, quantity } = req.body;
            if (!kitId || !componentId) {
                res.status(400).json({
                    message: "kitId and componentId are required"
                });
                return;
            }
            if (Number(kitId) === Number(componentId)) {
                res.status(400).json({
                    message: "A kit cannot contain itself"
                });
                return;
            }
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
            const kitId = Number(req.params.kitId);
            const componentId = Number(req.params.componentId);

            const kitComponent = await KitComponentService.findById(kitId, componentId);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit Component not found",
                });
                return;
            }

            const { quantity } = req.body;
            if (quantity === undefined) {
                res.status(400).json({
                    message: "quantity is required"
                });
                return;
            }

            const updateKitComponent = await KitComponentService.update(
                kitComponent,
                { quantity }
            );

            res.json(updateKitComponent);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const kitId = Number(req.params.kitId);
            const componentId = Number(req.params.componentId);

            const kitComponent = await KitComponentService.findById(kitId, componentId);

            if (!kitComponent) {
                res.status(404).json({
                    message: "Kit Component not found",
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
