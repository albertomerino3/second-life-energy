import { Router } from "express";
import { RoleController } from "./role.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", RoleController.getAll);
router.get("/:id", validateIdParams, RoleController.getById);
router.post("/", RoleController.create);
router.put("/:id", validateIdParams, RoleController.update);
router.delete("/:id", validateIdParams, RoleController.delete);

export default router;