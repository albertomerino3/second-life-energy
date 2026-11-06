import { Router } from "express";
import { ArticleReviewController } from "./article-review.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ArticleReviewController.getAll);

router.get("/:id", validateIdParams, ArticleReviewController.getById);

router.post("/", ArticleReviewController.create);

router.put("/:id", validateIdParams, ArticleReviewController.update);

router.delete("/:id", validateIdParams, ArticleReviewController.delete);

export default router;