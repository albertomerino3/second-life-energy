import { Router } from "express";
import { ArticleResourceController } from "./article-resource.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ArticleResourceController.getAll);

router.get("/:articleId/:resourceId", validateIdParams, ArticleResourceController.getById);

router.post("/", ArticleResourceController.create);

router.delete("/:articleId/:resourceId", validateIdParams, ArticleResourceController.delete);

export default router;
