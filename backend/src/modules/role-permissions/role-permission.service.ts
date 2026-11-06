import { RolePermission } from "./role-permission.model.js";
import { Role } from "../roles/role.model.js";
import { Permission } from "../permissions/permission.model.js";

const includeRelations = [
  { model: Role, as: "role", attributes: ["id", "name"] },
  { model: Permission, as: "permission", attributes: ["id", "code"] },
];

export class RolePermissionService {
  // All role-permission assignments, optionally of one role
  static async findAll(filters: { roleId?: number; permissionId?: number } = {}) {
    const where: Record<string, number> = {};
    if (filters.roleId) where.roleId = filters.roleId;
    if (filters.permissionId) where.permissionId = filters.permissionId;

    return RolePermission.findAll({
      where,
      include: includeRelations,
      order: [["roleId", "ASC"], ["permissionId", "ASC"]],
    });
  }

  // All permissions assigned to a specific role
  static async findByRoleId(roleId: number) {
    return RolePermissionService.findAll({ roleId });
  }

  static async findById(roleId: number, permissionId: number) {
    return RolePermission.findOne({
      where: { roleId, permissionId },
      include: includeRelations,
    });
  }

  // Assign a permission to a role
  static async create(data: { roleId: number; permissionId: number }) {
    await RolePermission.create(data);
    return RolePermissionService.findById(data.roleId, data.permissionId);
  }

  // Revoke a permission from a role
  static async delete(rolePermission: RolePermission) {
    await rolePermission.destroy();
  }
}
