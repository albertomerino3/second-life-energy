import { Request, Response, NextFunction } from "express";
import { InvitationService } from "./invitation.service.js";

export class InvitationController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const invitations = await InvitationService.findAll();
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
                const { invitedById, roleId, email, tokenHash, expiresAt, usedAt } = req.body;
                if (invitedById === undefined || roleId === undefined || !email || !tokenHash || !expiresAt) {
                    res.status(400).json({
                        message: "InvitedByID, roleId, email, tokenHash and expiresAt are required",
                    });
                    return;
                }
                const invitation = await InvitationService.create({
                    invitedById, 
                    roleId, 
                    email, 
                    tokenHash, 
                    expiresAt,
                    usedAt,
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