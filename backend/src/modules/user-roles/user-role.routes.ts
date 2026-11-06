import { Router } from "express";
import { UserRoleController } from "./user-role.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", UserRoleController.getAll);
router.get("/:userId/:roleId", validateIdParams, UserRoleController.getById);
router.post("/", UserRoleController.create);
router.put("/:userId/:roleId", validateIdParams, UserRoleController.update);
router.delete("/:userId/:roleId", validateIdParams, UserRoleController.delete);

export default router;