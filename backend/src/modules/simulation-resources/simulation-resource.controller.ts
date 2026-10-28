import { Request, Response, NextFunction } from "express";
import { SimulationResourceService } from "./simulation-resource.service.js";

export class SimulationResourceController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await SimulationResourceService.findAll();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const simulationId = Number(req.params.simulationId);
            const resourceId = Number(req.params.resourceId);
            const item = await SimulationResourceService.findById(simulationId, resourceId);
            if (!item) {
                res.status(404).json({
                    message: "SimulationResource not found",
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
            const { simulationId, resourceId } = req.body;
            if (!simulationId || !resourceId) {
                res.status(400).json({
                    message: "simulationId and resourceId are required",
                });
                return;
            }
            const item = await SimulationResourceService.create({
                simulationId,
                resourceId,
            });
            res.status(201).json(item);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const simulationId = Number(req.params.simulationId);
            const resourceId = Number(req.params.resourceId);
            const item = await SimulationResourceService.findById(simulationId, resourceId);
            if (!item) {
                res.status(404).json({
                    message: "SimulationResource not found",
                });
                return;
            }
            await SimulationResourceService.delete(item);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}