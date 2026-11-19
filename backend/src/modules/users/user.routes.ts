import { Router } from "express";
import { UserController } from "./user.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
import { upload } from "../../middlewares/upload-middleware.js"

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("users:read"), UserController.getAll);

router.get("/:id", authorize("users:read"), UserController.getById);

router.post("/", authorize("users:create"), upload.single("image"), UserController.create);

router.put("/:id", authorize("users:update"), upload.single("image"), UserController.update);

router.delete("/:id", authorize("users:delete"), UserController.delete);

export default router;