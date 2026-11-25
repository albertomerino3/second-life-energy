import { Router } from "express";
import { ArticleCategoryController } from "./article-category.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article-categories:read"), ArticleCategoryController.getAll);

router.get("/:id", authorize("article-categories:read"), ArticleCategoryController.getById);

router.post("/", authorize("article-categories:read"), ArticleCategoryController.create);

router.put("/:id", authorize("article-categories:read"), ArticleCategoryController.update);

router.delete("/:id", authorize("article-categories:read"), ArticleCategoryController.delete);

export default router;