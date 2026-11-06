import { Router } from "express";
import { RolePermissionController } from "./role-permission.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", RolePermissionController.getAll);
// Declared before "/:roleId/:permissionId" so "role" is not read as an id
router.get("/role/:roleId", validateIdParams, RolePermissionController.getByRoleId);
router.get("/:roleId/:permissionId", validateIdParams, RolePermissionController.getById);
router.post("/", RolePermissionController.assign);
router.delete("/:roleId/:permissionId", validateIdParams, RolePermissionController.revoke);

export default router;
