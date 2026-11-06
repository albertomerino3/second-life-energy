import { Router } from "express";
import { InvitationController } from "./invitation.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", InvitationController.getAll);

router.get("/:id", validateIdParams, InvitationController.getById);

router.post("/", InvitationController.create);

router.put("/:id", validateIdParams, InvitationController.update);

router.delete("/:id", validateIdParams, InvitationController.delete);

export default router;