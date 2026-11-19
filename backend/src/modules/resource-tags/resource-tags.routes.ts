import { Router } from "express";
import { ResourceTagController } from "./resource-tags.controller.js";

const router = Router();

router.get("/", ResourceTagController.getAll);

router.get("/:id", ResourceTagController.getById);

router.post("/", ResourceTagController.create);

router.put("/:id", ResourceTagController.update);

router.delete("/:id", ResourceTagController.delete);

export default router;