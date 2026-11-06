import { Request, Response, NextFunction } from "express";
import { RolePermissionService } from "./role-permission.service.js";

// Join table with a composite key: there is no PUT, a permission is
// revoked (DELETE) and assigned again (POST).
export class RolePermissionController {
  // GET /role-permissions?roleId=&permissionId=
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await RolePermissionService.findAll({
        roleId: Number(req.query.roleId) || undefined,
        permissionId: Number(req.query.permissionId) || undefined,
      });
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  // GET /role-permissions/role/:roleId
  static async getByRoleId(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.roleId);
      const items = await RolePermissionService.findByRoleId(roleId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  // GET /role-permissions/:roleId/:permissionId
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.roleId);
      const permissionId = Number(req.params.permissionId);
      const item = await RolePermissionService.findById(roleId, permissionId);
      if (!item) {
        res.status(404).json({ message: "Role permission association not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  // POST /role-permissions
  static async assign(req: Request, res: Response, next: NextFunction) {
    try {
      const { roleId, permissionId } = req.body;
      if (!roleId || !permissionId) {
        res.status(400).json({ message: "roleId and permissionId are required" });
        return;
      }
      const assigned = await RolePermissionService.create({ roleId, permissionId });
      res.status(201).json(assigned);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /role-permissions/:roleId/:permissionId
  static async revoke(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.roleId);
      const permissionId = Number(req.params.permissionId);
      const item = await RolePermissionService.findById(roleId, permissionId);
      if (!item) {
        res.status(404).json({ message: "Role permission association not found" });
        return;
      }
      await RolePermissionService.delete(item);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
