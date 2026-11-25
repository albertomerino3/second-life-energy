import { Router } from "express";
import { ModerationController } from "./moderation.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("moderations:read"), ModerationController.getAll);
router.get("/:id", authorize("moderations:read"), ModerationController.getById);
router.post("/", authorize("moderations:read"), ModerationController.create);
router.put("/:id", authorize("moderations:read"), ModerationController.update);
router.delete("/:id", authorize("moderations:read"), ModerationController.delete);

export default router;
