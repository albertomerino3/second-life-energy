import { Permission } from "./permission.model.js";
import { Role } from "../roles/role.model.js";

export class PermissionService {
  static async findAll() {
    return Permission.findAll({
      order: [["id", "ASC"]],
    });
  }

  // A permission with the roles that grant it
  static async findById(id: number) {
    return Permission.findByPk(id, {
      include: [{ model: Role, as: "roles", attributes: ["id", "name"], through: { attributes: [] } }],
    });
  }

  static async create(data: { code: string; description?: string | null }) {
    return Permission.create(data);
  }

  static async update(permission: Permission, data: { code?: string; description?: string | null }) {
    return permission.update(data, { fields: ["code", "description"] });
  }

  static async delete(permission: Permission) {
    await permission.destroy();
  }
}
