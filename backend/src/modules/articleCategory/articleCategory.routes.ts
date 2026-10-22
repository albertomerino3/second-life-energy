import { Router } from "express";
import { ArticleCategoryController } from "./articleCategory.controller.js";

const router = Router();

router.get("/", ArticleCategoryController.getAll);

router.get("/:id", ArticleCategoryController.getById);

router.post("/", ArticleCategoryController.create);

router.put("/:id", ArticleCategoryController.update);

router.delete("/:id", ArticleCategoryController.delete);

export default router;