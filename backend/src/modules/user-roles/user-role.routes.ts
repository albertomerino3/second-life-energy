import { Router } from "express";
import { UserRoleController } from "./user-role.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("user-roles:read"), UserRoleController.getAll);
router.get("/:userId/:roleId", authorize("user-roles:read"), UserRoleController.getById);
router.post("/", authorize("user-roles:read"), UserRoleController.create);
router.put("/:userId/:roleId", authorize("user-roles:read"), UserRoleController.update);
router.delete("/:userId/:roleId", authorize("user-roles:read"), UserRoleController.delete);

export default router;