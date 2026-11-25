import { Router } from "express";
import { ArticleResourceController } from "./article-resource.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article-resources:read"), ArticleResourceController.getAll);

router.get("/:articleId/:resourceId", authorize("article-resources:read"), ArticleResourceController.getById);

router.post("/", authorize("article-resources:read"), ArticleResourceController.create);

router.delete("/:articleId/:resourceId", authorize("article-resources:read"), ArticleResourceController.delete);

export default router;
