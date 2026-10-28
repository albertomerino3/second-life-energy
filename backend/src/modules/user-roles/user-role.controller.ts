import { Request, Response, NextFunction } from "express";
import { UserRoleService } from "./user-role.service.js";

export class UserRoleController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userRoles = await UserRoleService.findAll();
            res.json(userRoles);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            const roleId = Number(req.params.roleId);
            const userRole = await UserRoleService.findById(userId, roleId);
            if (!userRole) {
                res.status(404).json({
                    message: "UserRole not found",
                });
                return;
            }
            res.json(userRole);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, roleId, assignedAt } = req.body;
            if (!userId || !roleId) {
                res.status(400).json({
                    message: "userId and roleId are required",
                });
                return;
            }
            const userRole = await UserRoleService.create({
                userId,
                roleId,
                assignedAt,
            });
            res.status(201).json(userRole);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            const roleId = Number(req.params.roleId);
            const userRole = await UserRoleService.findById(userId, roleId);
            if (!userRole) {
                res.status(404).json({
                    message: "UserRole not found",
                });
                return;
            }
            const updatedUserRole = await UserRoleService.update(
                userRole,
                req.body
            );
            res.json(updatedUserRole);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            const roleId = Number(req.params.roleId);
            const userRole = await UserRoleService.findById(userId, roleId);
            if (!userRole) {
                res.status(404).json({
                    message: "UserRole not found",
                });
                return;
            }
            await UserRoleService.delete(userRole);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}