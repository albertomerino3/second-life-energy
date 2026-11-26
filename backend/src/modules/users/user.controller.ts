import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "./user.service.js";
import { removeImage } from "../../middlewares/upload-middleware.js";

// Con multipart/form-data (imagen) todo llega como texto: "true"/"false" hay que convertirlo.
function parseBoolean(value: unknown): boolean | undefined | null {
    if (value === undefined || value === "") return undefined;
    if (value === true || value === "true") return true;
    if (value === false || value === "false") return false;
    return null;
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
            const { name, email, password } = req.body ?? {};
            const isActive = parseBoolean(req.body?.isActive);
            if (!name || !email || !password) {
                res.status(400).json({
                    message: "Name, email and password are required",
                });
                return;
            }
            if (isActive === null || String(password).length < 8) {
                res.status(400).json({
                    message: "isActive must be a boolean and password must have at least 8 characters",
                });
                return;
            }
            const user = await UserService.create({
                name: String(name).trim(),
                email: String(email).trim(),
                passwordHash: await bcrypt.hash(String(password), 10),
                isActive,
                filename: req.file?.filename ?? null,
            });
            created = true;

            res.status(201).json(user);

        } catch (error) {
            next(error);
        } finally {
            if (!created && req.file) await removeImage(req.file.filename);
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

            const { name, email, password } = req.body ?? {};
            const isActive = parseBoolean(req.body?.isActive);
            if (isActive === null || (password !== undefined && password !== "" && String(password).length < 8)) {
                res.status(400).json({
                    message: "isActive must be a boolean and password must have at least 8 characters",
                });
                return;
            }

            const data: Parameters<typeof UserService.update>[1] = {};
            if (name !== undefined) data.name = String(name).trim();
            if (email !== undefined) data.email = String(email).trim();
            if (isActive !== undefined) data.isActive = isActive;
            // Contraseña vacía al editar = mantener la actual.
            if (password) data.passwordHash = await bcrypt.hash(String(password), 10);

            const previousFilename = user.filename;
            if (req.file) data.filename = req.file.filename;

            const updatedUser = await UserService.update(user, data);
            updated = true;
            if (req.file) await removeImage(previousFilename);

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
            const filename = user.filename;
            await UserService.delete(user);
            await removeImage(filename);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
