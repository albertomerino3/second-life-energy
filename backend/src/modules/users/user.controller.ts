import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.findAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.findById(id);
            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });
                return;
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, passwordHash, isActive } = req.body;
            if (!name || !email || !passwordHash) {
                res.status(400).json({
                    message: "Name, email and passwordHash are required",
                });
                return;
            }
            if (isActive !== undefined && typeof isActive !== "boolean") {
                res.status(400).json({
                    message: "isActive must be a boolean",
                });
                return;
            }
            const user = await UserService.create({
                name, 
                email, 
                passwordHash, 
                isActive
            });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.findById(id);
            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });
                return;
            }
            const updatedUser = await UserService.update(
                user,
                req.body
            );
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.findById(id);
            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });
                return;
            }
            await UserService.delete(user);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}