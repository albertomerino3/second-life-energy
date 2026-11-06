import { Router } from "express";
import { UserController } from "./user.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", UserController.getAll);

router.get("/:id", validateIdParams, UserController.getById);

router.post("/", UserController.create);

router.put("/:id", validateIdParams, UserController.update);

router.delete("/:id", validateIdParams, UserController.delete);

export default router;