import { Router } from "express";
import { TagController } from "./tag.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", TagController.getAll);

router.get("/:id", validateIdParams, TagController.getById);

router.post("/", TagController.create);

router.put("/:id", validateIdParams, TagController.update);

router.delete("/:id", validateIdParams, TagController.delete);

export default router;