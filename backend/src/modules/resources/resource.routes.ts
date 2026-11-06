import { Router } from "express";
import { ResourceController } from "./resource.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ResourceController.getAll);

router.get("/:id", validateIdParams, ResourceController.getById);

router.post("/", ResourceController.create);

router.put("/:id", validateIdParams, ResourceController.update);

router.delete("/:id", validateIdParams, ResourceController.delete);

export default router;