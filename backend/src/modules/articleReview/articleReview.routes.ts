import { Router } from "express";
import { ArticleReviewController } from "./articleReview.controller.js";

const router = Router();

router.get("/", ArticleReviewController.getAll);

router.get("/:id", ArticleReviewController.getById);

router.post("/", ArticleReviewController.create);

router.put("/:id", ArticleReviewController.update);

router.delete("/:id", ArticleReviewController.delete);

export default router;