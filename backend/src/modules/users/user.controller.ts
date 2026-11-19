import { Request, Response, NextFunction } from "express";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { UserService } from "./user.service.js";

const UPLOADS_DIR = path.resolve("uploads");

async function removeImage(filename?: string | null) {
    if (!filename) return;
    try {
        await unlink(path.join(UPLOADS_DIR, filename));
    } catch (error) {
        console.error(`Failed to remove image (${filename}):`, error);
    }
}

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const isActive = req.query.isActive === undefined
                ? undefined
                : req.query.isActive === "true";
            const users = await UserService.findAll({ isActive });
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
        let created = false;
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
                isActive,
                filename: req.file?.filename ?? null,
            });
            created = true;

            res.status(201).json(user);

        } catch (error) {
            next(error);
        } finally {
            if (!created && req.file) {
                await unlink(req.file.path).catch((error) => console.error("Failed to remove uploaded image", error));
            }
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let updated = false;
        try {
            const id = Number(req.params.id);
            const user = await UserService.findById(id);
            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });
                return;
            }
            const previousFilename = user.filename;
            const data: Record<string, any> = { ...req.body };
            if (req.file) { data.filename = req.file.filename };

            const updatedUser = await UserService.update(user, data);
            updated = true;
            if (req.file && previousFilename) {await removeImage(previousFilename)};

            res.json(updatedUser);
        } catch (error) {
            next(error);
        } finally {
            if (!updated && req.file) await removeImage(req.file.filename);
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