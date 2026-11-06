import { Router } from "express";
import { ArticleResourceController } from "./article-resource.controller.js";

const router = Router();

router.get("/", ArticleResourceController.getAll);

router.get("/:articleId/:resourceId", ArticleResourceController.getById);

router.post("/", ArticleResourceController.create);

router.delete("/:articleId/:resourceId", ArticleResourceController.delete);

export default router;
