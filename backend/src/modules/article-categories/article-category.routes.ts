import { Router } from "express";
import { ArticleCategoryController } from "./article-category.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ArticleCategoryController.getAll);

router.get("/:id", validateIdParams, ArticleCategoryController.getById);

router.post("/", ArticleCategoryController.create);

router.put("/:id", validateIdParams, ArticleCategoryController.update);

router.delete("/:id", validateIdParams, ArticleCategoryController.delete);

export default router;