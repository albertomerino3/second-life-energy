import { Request, Response, NextFunction } from "express";
import { ResourceTagService } from "./resource-tags.service.js";

export class ResourceTagController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tag = await ResourceTagService.findAll();
            res.json(tag);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const tag = await ResourceTagService.findById(id);
            if (!tag) {
                res.status(404).json({
                    message: "ResourceTag not found",
                });
                return;
            }
            res.json(tag);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { resourceId, tagId } = req.body;
            if (!resourceId || !tagId) {
                res.status(400).json({
                    message: "resourceId and tagId are required",
                });
                return;
            }
            const resourceTag = await ResourceTagService.create({
                resourceId,
                tagId,
            });
            res.status(201).json(resourceTag);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const tag = await ResourceTagService.findById(id);
            if (!tag) {
                res.status(404).json({
                    message: "ResourceTagService not found",
                });
                return;
            }
            const updatedTag = await ResourceTagService.update(
                tag,
                req.body
            );
            res.json(updatedTag);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const tag = await ResourceTagService.findById(id);
            if (!tag) {
                res.status(404).json({
                    message: "ResourceTag not found",
                });
                return;
            }
            await ResourceTagService.delete(tag);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}