import { Router } from "express";
import { RolePermissionController } from "./role-permission.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("role-permissions:read"), RolePermissionController.getAll);
router.get("/role/:roleId", authorize("role-permissions:read"), RolePermissionController.getByRoleId);
router.get("/:roleId/:permissionId", authorize("role-permissions:read"), RolePermissionController.getById);
router.post("/", authorize("role-permissions:read"), RolePermissionController.assign);
router.delete("/:roleId/:permissionId", authorize("role-permissions:read"), RolePermissionController.revoke);

export default router;
