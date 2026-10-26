import { RolePermission } from './role-permission.model.js';

export class RolePermissionService {
  // All permissions assigned to a specific role
  async getByRoleId(roleId: number): Promise<RolePermission[]> {
    return await RolePermission.findAll({ where: { roleId } });
  }

  // Assign a permission to a role
  async assign(data: any): Promise<RolePermission> {
    return await RolePermission.create(data);
  }

  // Revoke a permission from a role
  async revoke(roleId: number, permissionId: number): Promise<boolean> {
    const deletedCount = await RolePermission.destroy({
      where: { roleId, permissionId },
    });
    return deletedCount > 0;
  }
}