import { Request, Response, NextFunction } from "express";
import { AuditLogService } from "./audit-log.service.js";

export class AuditLogController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const auditLogs = await AuditLogService.findAll();
            res.json(auditLogs);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const auditLog = await AuditLogService.findById(id);
            if (!auditLog) {
                res.status(404).json({
                    message: "AuditLog not found",
                });
                return;
            }
            res.json(auditLog);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, entity, entityId, action, previousValues, newValues } = req.body;
            if (!userId || !entity|| !entityId || !action) {
                res.status(400).json({
                    message: "userId, entity, entityId and action are required",
                });
                return;
            }
            const auditLog = await AuditLogService.create({
                userId, 
                entity, 
                entityId, 
                action, 
                previousValues, 
                newValues
            });
            res.status(201).json(auditLog);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const auditLog = await AuditLogService.findById(id);
            if (!auditLog) {
                res.status(404).json({
                    message: "AuditLog not found",
                });
                return;
            }
            const updatedAuditLog = await AuditLogService.update(
                auditLog,
                req.body
            );
            res.json(updatedAuditLog);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const auditLog = await AuditLogService.findById(id);
            if (!auditLog) {
                res.status(404).json({
                    message: "AuditLog not found",
                });
                return;
            }
            await AuditLogService.delete(auditLog);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}