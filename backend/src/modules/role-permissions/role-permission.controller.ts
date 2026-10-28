import { Request, Response } from 'express';
import { RolePermissionService } from './role-permission.service.js';

const rolePermissionService = new RolePermissionService();

export class RolePermissionController {
  // GET /role-permissions/role/:roleId
  static async getByRoleId(req: Request, res: Response): Promise<void> {
    try {
      const roleId = Number(req.params.roleId);
      const items = await rolePermissionService.getByRoleId(roleId);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving role permissions', error });
    }
  }

  // POST /role-permissions
  static async assign(req: Request, res: Response): Promise<void> {
    try {
      const assigned = await rolePermissionService.assign(req.body);
      res.status(201).json(assigned);
    } catch (error) {
      res.status(400).json({ message: 'Error assigning permission to role', error });
    }
  }

  // DELETE /role-permissions/:roleId/:permissionId
  static async revoke(req: Request, res: Response): Promise<void> {
    try {
      const roleId = Number(req.params.roleId);
      const permissionId = Number(req.params.permissionId);
      const deleted = await rolePermissionService.revoke(roleId, permissionId);
      if (!deleted) {
        res.status(404).json({ message: 'Role permission association not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error revoking permission', error });
    }
  }
}