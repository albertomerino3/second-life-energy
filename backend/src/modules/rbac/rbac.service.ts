import { User } from "../users/user.model.js";
import { Permission } from "../permissions/permission.model.js";
import { Role } from "../roles/role.model.js";

export class RbacService {

  // Códigos de permiso (p. ej. "articles:read") de todos los roles del usuario: User -> UserRole -> Role -> RolePermission -> Permission.
  static async getUserPermissions(userId: number): Promise<string[]> {
    const permissions = await Permission.findAll({
      attributes: ["code"],
      include: [{
        model: Role,
        as: "roles",
        attributes: [],
        through: { attributes: [] },
        required: true,
        include: [{
          model: User,
          as: "users",
          attributes: [],
          through: { attributes: [] },
          where: { id: userId },
          required: true,
        }],
      }],
    });
    return permissions.map(permission => permission.code);
  }
}
