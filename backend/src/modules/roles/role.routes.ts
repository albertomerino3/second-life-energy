import { Router } from "express";
import { RoleController } from "./role.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("roles:read"), RoleController.getAll);
router.get("/:id", authorize("roles:read"), RoleController.getById);
router.post("/", authorize("roles:read"), RoleController.create);
router.put("/:id", authorize("roles:read"), RoleController.update);
router.delete("/:id", authorize("roles:read"), RoleController.delete);

export default router;