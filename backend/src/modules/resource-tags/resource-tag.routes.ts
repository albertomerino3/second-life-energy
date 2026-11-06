import { Router } from "express";
import { ResourceTagController } from "./resource-tag.controller.js";

const router = Router();

router.get("/", ResourceTagController.getAll);

router.get("/:resourceId/:tagId", ResourceTagController.getById);

router.post("/", ResourceTagController.create);

router.delete("/:resourceId/:tagId", ResourceTagController.delete);

export default router;
