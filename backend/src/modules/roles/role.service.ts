import { Role } from "./role.model.js";
import { FindOptions } from "sequelize";

export class RoleService {
    static async findAll() {
        return Role.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number, options?: FindOptions) {
        return Role.findByPk(id, options);
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
        return role.update(data);
    }

    static async delete(role: Role) {
        await role.destroy();
    }
}