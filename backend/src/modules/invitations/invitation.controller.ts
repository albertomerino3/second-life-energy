import { Request, Response, NextFunction } from "express";
import { createHash, randomBytes } from "node:crypto";
import { InvitationService } from "./invitation.service.js";

const INVITATION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export class InvitationController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const invitations = await InvitationService.findAll({ state: typeof req.query.state === "string" ? req.query.state : undefined });
            res.json(invitations);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const invitation = await InvitationService.findById(id);
            if (!invitation) {
                res.status(404).json({
                    message: "Invitation not found",
                });
                return;
            }
            res.json(invitation);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
            try {
                const { roleId, email } = req.body;
                if (roleId === undefined || !email) {
                    res.status(400).json({
                        message: "roleId and email are required",
                    });
                    return;
                }
                // Lo genera el servidor: quién invita (usuario autenticado), el token de un solo uso
                // (solo se guarda su hash) y la caducidad (7 días por defecto).
                const token = randomBytes(32).toString("hex");
                const invitation = await InvitationService.create({
                    invitedById: res.locals.authUser.user.id,
                    roleId,
                    email,
                    tokenHash: createHash("sha256").update(token).digest("hex"),
                    expiresAt: req.body.expiresAt ? new Date(req.body.expiresAt) : new Date(Date.now() + INVITATION_TTL_MS),
                    usedAt: null,
                });
                res.status(201).json(invitation);
            } catch (error) {
                next(error);
            }
        }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const invitation = await InvitationService.findById(id);
            if (!invitation) {
                res.status(404).json({
                    message: "Invitation not found",
                });
                return;
            }
            const updatedInvitation = await InvitationService.update(
                invitation,
                req.body
            );
            res.json(updatedInvitation);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const invitation = await InvitationService.findById(id);
            if (!invitation) {
                res.status(404).json({
                    message: "Invitation not found",
                });
                return;
            }
            await InvitationService.delete(invitation);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}