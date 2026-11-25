import { Router } from "express";
import { UserController } from "./user.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("users:read"), UserController.getAll);

router.get("/:id", authorize("users:read"), UserController.getById);

router.post("/", authorize("users:read"), UserController.create);

router.put("/:id", authorize("users:read"), UserController.update);

router.delete("/:id", authorize("users:read"), UserController.delete);

export default router;