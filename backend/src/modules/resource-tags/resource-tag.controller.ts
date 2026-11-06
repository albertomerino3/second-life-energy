import { Request, Response, NextFunction } from "express";
import { ResourceTagService } from "./resource-tag.service.js";

// Join table with a composite key: there is no PUT, a relationship is
// changed by deleting it and creating a new one.
export class ResourceTagController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const resourceTags = await ResourceTagService.findAll({
                resourceId: Number(req.query.resourceId) || undefined,
                tagId: Number(req.query.tagId) || undefined,
            });
            res.json(resourceTags);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const resourceId = Number(req.params.resourceId);
            const tagId = Number(req.params.tagId);
            const resourceTag = await ResourceTagService.findById(resourceId, tagId);
            if (!resourceTag) {
                res.status(404).json({
                    message: "ResourceTag not found",
                });
                return;
            }
            res.json(resourceTag);
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

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const resourceId = Number(req.params.resourceId);
            const tagId = Number(req.params.tagId);
            const resourceTag = await ResourceTagService.findById(resourceId, tagId);
            if (!resourceTag) {
                res.status(404).json({
                    message: "ResourceTag not found",
                });
                return;
            }
            await ResourceTagService.delete(resourceTag);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
