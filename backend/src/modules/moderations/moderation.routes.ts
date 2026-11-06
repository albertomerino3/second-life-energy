import { Router } from "express";
import { ModerationController } from "./moderation.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ModerationController.getAll);
router.get("/:id", validateIdParams, ModerationController.getById);
router.post("/", ModerationController.create);
router.put("/:id", validateIdParams, ModerationController.update);
router.delete("/:id", validateIdParams, ModerationController.delete);

export default router;
