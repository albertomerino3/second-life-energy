import { UserRole } from "./user-role.model.js";
import { FindOptions } from "sequelize";

export class UserRoleService {
    static async findAll() {
        return UserRole.findAll({
            order: [["userId", "ASC"]],
        });
    }

    static async findById(userId: number, roleId: number, options?: FindOptions) {
        return UserRole.findOne({
            where: { userId, roleId },
            ...options,
        });
    }

    static async create(data: {
        userId: number;
        roleId: number;
        assignedAt?: Date;
    }) {
        return UserRole.create(data);
    }

    static async update(
        userRole: UserRole,
        data: {
            assignedAt?: Date;
        }
    ) {
        return userRole.update(data);
    }

    static async delete(userRole: UserRole) {
        await userRole.destroy();
    }
}