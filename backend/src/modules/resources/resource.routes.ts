import { Router } from "express";
import { ResourceController } from "./resource.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("resources:read"), ResourceController.getAll);

router.get("/:id", authorize("resources:read"), ResourceController.getById);

router.post("/", authorize("resources:read"), ResourceController.create);

router.put("/:id", authorize("resources:read"), ResourceController.update);

router.delete("/:id", authorize("resources:read"), ResourceController.delete);

export default router;