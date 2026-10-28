import { Request, Response, NextFunction } from "express";
import { ResourceService } from "./resource.service.js";

export class ResourceController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const resources = await ResourceService.findAll();
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const resource = await ResourceService.findById(id);
            if (!resource) {
                res.status(404).json({
                    message: "Resource not found",
                });
                return;
            }
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorId, title, description, type, topic, difficulty, url, status, publishedAt } = req.body;
            if (!authorId || !title || !description || !type || !topic || !difficulty || !url || !status ) {
                res.status(400).json({
                    message: "AuthorId, title, description, type, topic, difficulty, url and status are required",
                });
                return;
            }
            const resource = await ResourceService.create({
                authorId, 
                title, 
                description, 
                type, 
                topic, 
                difficulty, 
                url, 
                status,
                publishedAt
            });
            res.status(201).json(resource);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const resource = await ResourceService.findById(id);
            if (!resource) {
                res.status(404).json({
                    message: "Resource not found",
                });
                return;
            }
            const updatedResource = await ResourceService.update(
                resource,
                req.body
            );
            res.json(updatedResource);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const resource = await ResourceService.findById(id);
            if (!resource) {
                res.status(404).json({
                    message: "Resource not found",
                });
                return;
            }
            await ResourceService.delete(resource);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}