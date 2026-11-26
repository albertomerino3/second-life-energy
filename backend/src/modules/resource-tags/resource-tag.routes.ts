import { Router } from "express";
import { ResourceTagController } from "./resource-tag.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("resource-tags:read"), ResourceTagController.getAll);

router.get("/:resourceId/:tagId", authorize("resource-tags:read"), ResourceTagController.getById);

router.post("/", authorize("resource-tags:create"), ResourceTagController.create);

router.delete("/:resourceId/:tagId", authorize("resource-tags:delete"), ResourceTagController.delete);

export default router;
