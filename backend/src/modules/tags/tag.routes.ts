import { Router } from "express";
import { TagController } from "./tag.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("tags:read"), TagController.getAll);

router.get("/:id", authorize("tags:read"), TagController.getById);

router.post("/", authorize("tags:read"), TagController.create);

router.put("/:id", authorize("tags:read"), TagController.update);

router.delete("/:id", authorize("tags:read"), TagController.delete);

export default router;