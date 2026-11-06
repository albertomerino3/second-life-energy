import { Router } from "express";
import { ResourceTagController } from "./resource-tag.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ResourceTagController.getAll);

router.get("/:resourceId/:tagId", validateIdParams, ResourceTagController.getById);

router.post("/", ResourceTagController.create);

router.delete("/:resourceId/:tagId", validateIdParams, ResourceTagController.delete);

export default router;
