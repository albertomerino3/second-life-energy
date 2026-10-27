import { Invitation } from "./invitation.model.js";

export class InvitationService {
    static async findAll() {
        return Invitation.findAll({
            order: [["name", "ASC"]],
        });
    }
    
    static async findById(id: number) {
        return Invitation.findByPk(id);
    }
    
    static async create(data: {
        invitedById: number;
    }) {
        return Invitation.create(data);
    }
    
    static async update(
        invitation: Invitation,
        data: {
            name?: string;
        }
    ) {
        return invitation.update(data);
    }
    
    static async delete(invitation: Invitation) {
        await invitation.destroy();
    }
}