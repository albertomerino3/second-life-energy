import { Router } from "express";
import { RequestItemController } from "./request-item.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("request-items:read"), RequestItemController.getAll);

router.get("/:id", authorize("request-items:read"), RequestItemController.getById);

router.post("/", authorize("request-items:read"), RequestItemController.create);

router.put("/:id", authorize("request-items:read"), RequestItemController.update);

router.delete("/:id", authorize("request-items:read"), RequestItemController.delete);

export default router;