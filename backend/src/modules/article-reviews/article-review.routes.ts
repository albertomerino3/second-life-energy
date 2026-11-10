import { Router } from "express";
import { ArticleReviewController } from "./article-review.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article-reviews:read"), ArticleReviewController.getAll);

router.get("/:id", authorize("article-reviews:read"), ArticleReviewController.getById);

router.post("/", authorize("article-reviews:read"), ArticleReviewController.create);

router.put("/:id", authorize("article-reviews:read"), ArticleReviewController.update);

router.delete("/:id", authorize("article-reviews:read"), ArticleReviewController.delete);

export default router;