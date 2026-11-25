import { Router } from "express";
import { RequestController } from "./request.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("requests:read"), RequestController.getAll);

router.get("/:id", authorize("requests:read"), RequestController.getById);

router.post("/", authorize("requests:create"), RequestController.create);

router.put("/:id", authorize("requests:update"), RequestController.update);

router.delete("/:id", authorize("requests:delete"), RequestController.delete);

export default router;
