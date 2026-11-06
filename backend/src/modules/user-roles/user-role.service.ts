import { UserRole } from "./user-role.model.js";
import { FindOptions } from "sequelize";
import { User } from "../users/user.model.js";
import { Role } from "../roles/role.model.js";

const includeRelations = [
    { model: User, as: "user", attributes: ["id", "name", "email"] },
    { model: Role, as: "role", attributes: ["id", "name"] },
];

export class UserRoleService {
    static async findAll(filters: { userId?: number; roleId?: number } = {}) {
        const where: Record<string, number> = {};
        if (filters.userId) where.userId = filters.userId;
        if (filters.roleId) where.roleId = filters.roleId;

        return UserRole.findAll({
            where,
            include: includeRelations,
            order: [["userId", "ASC"], ["roleId", "ASC"]],
        });
    }

    static async findById(userId: number, roleId: number, options?: FindOptions) {
        return UserRole.findOne({
            where: { userId, roleId },
            include: includeRelations,
            ...options,
        });
    }

    static async create(data: {
        userId: number;
        roleId: number;
        assignedAt?: Date;
    }) {
        await UserRole.create(data);
        return UserRoleService.findById(data.userId, data.roleId);
    }

    static async update(
        userRole: UserRole,
        data: {
            assignedAt?: Date;
        }
    ) {
        return userRole.update(data, { fields: ["assignedAt"] });
    }

    static async delete(userRole: UserRole) {
        await userRole.destroy();
    }
}