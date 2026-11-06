import { Role } from "./role.model.js";
import { FindOptions } from "sequelize";
import { Permission } from "../permissions/permission.model.js";
import { User } from "../users/user.model.js";

const includePermissions = {
    model: Permission,
    as: "permissions",
    attributes: ["id", "code"],
    through: { attributes: [] },
};

export class RoleService {
    static async findAll() {
        return Role.findAll({
            include: [includePermissions],
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number, options?: FindOptions) {
        return Role.findByPk(id, {
            include: [
                includePermissions,
                { model: User, as: "users", attributes: ["id", "name", "email"], through: { attributes: ["assignedAt"] } },
            ],
            ...options,
        });
    }

    static async create(data: {
        id?: number;
        name: string;
        description?: string | null;
    }) {
        return Role.create(data);
    }

    static async update(
        role: Role,
        data: {
            name?: string;
            description?: string | null;
        }
    ) {
        return role.update(data, { fields: ["name", "description"] });
    }

    static async delete(role: Role) {
        await role.destroy();
    }
}