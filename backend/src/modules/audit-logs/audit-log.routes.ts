import { Router } from "express";
import { AuditLogController } from "./audit-log.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", AuditLogController.getAll);

router.get("/:id", validateIdParams, AuditLogController.getById);

router.post("/", AuditLogController.create);

router.put("/:id", validateIdParams, AuditLogController.update);

router.delete("/:id", validateIdParams, AuditLogController.delete);

export default router;