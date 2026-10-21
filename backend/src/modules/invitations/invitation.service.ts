import { Invitation } from "./invitation.model.js";

export class InvitationService {
    static async findAll() {
        return Invitation.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Invitation.findByPk(id);
    }

    static async create(data: {
        invitedById: number;
        roleId: number;
        email: string;
        tokenHash: string;
        expiresAt: Date;
    }) {
        return Invitation.create(data);
    }

    static async update(
        invitation: Invitation,
        data: {
            invitedById?: number;
            roleId?: number;
            email?: string;
            tokenHash?: string;
            expiresAt?: Date;
        }
    ) {
        return invitation.update(data);
    }

    static async delete(invitation: Invitation) {
        await invitation.destroy();
    }
}