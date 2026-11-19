import { Router } from "express";
import { AuditLogController } from "./audit-log.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("audit-logs:read"), AuditLogController.getAll);

router.get("/:id", authorize("audit-logs:read"), AuditLogController.getById);

router.post("/", authorize("audit-logs:create"), AuditLogController.create);

router.put("/:id", authorize("audit-logs:update"), AuditLogController.update);

router.delete("/:id", authorize("audit-logs:delete"), AuditLogController.delete);

export default router;