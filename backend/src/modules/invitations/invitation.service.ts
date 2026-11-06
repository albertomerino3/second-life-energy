import { Op, WhereOptions } from "sequelize";
import { Invitation } from "./invitation.model.js";
import { User } from "../users/user.model.js";
import { Role } from "../roles/role.model.js";

const includeRelations = [
    { model: User, as: "invitedBy", attributes: ["id", "name", "email"] },
    { model: Role, as: "role", attributes: ["id", "name"] },
];

export class InvitationService {
    static async findAll(filters: { state?: string } = {}) {
        const now = new Date();
        let where: WhereOptions = {};

        if (filters.state === "pending") {
            where = { usedAt: null, expiresAt: { [Op.gt]: now } };
        } else if (filters.state === "used") {
            where = { usedAt: { [Op.ne]: null } };
        } else if (filters.state === "expired") {
            where = { usedAt: null, expiresAt: { [Op.lte]: now } };
        }

        return Invitation.findAll({
            where,
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Invitation.findByPk(id, {
            include: includeRelations,
        });
    }

    static async create(data: {
        invitedById: number;
        roleId: number;
        email: string;
        tokenHash: string;
        expiresAt: Date;
        usedAt?: Date | null;
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
            usedAt?: Date | null;
        }
    ) {
        return invitation.update(data, {
            fields: ["invitedById", "roleId", "email", "tokenHash", "expiresAt", "usedAt"],
        });
    }

    static async delete(invitation: Invitation) {
        await invitation.destroy();
    }
}
