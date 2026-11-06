import { Request, Response, NextFunction } from "express";
import { RequestService } from "./request.service.js";

export class RequestController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const status = typeof req.query.status === "string" ? req.query.status : undefined;
            const requests = await RequestService.findAll({ status });
            res.json(requests);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const request = await RequestService.findById(id);
            if (!request) {
                res.status(404).json({
                    message: "Request not found",
                });
                return;
            }
            res.json(request);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { contactName, contactEmail, notes, status } = req.body;
            if (!contactName || !contactEmail) {
                res.status(400).json({
                    message: "contactName and contactEmail are required",
                });
                return;
            }
            const request = await RequestService.create({
                contactName,
                contactEmail,
                notes,
                status,
            });
            res.status(201).json(request);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const request = await RequestService.findById(id);
            if (!request) {
                res.status(404).json({
                    message: "Request not found",
                });
                return;
            }
            const updatedRequest = await RequestService.update(request, req.body);
            res.json(updatedRequest);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const request = await RequestService.findById(id);
            if (!request) {
                res.status(404).json({
                    message: "Request not found",
                });
                return;
            }
            await RequestService.delete(request);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
