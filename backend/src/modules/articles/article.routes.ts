import { Router } from "express";
import { ArticleController } from "./article.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("articles:read"), ArticleController.getAll);

router.get("/:id", authorize("articles:read"),  ArticleController.getById);

router.post("/", authorize("articles:create"), ArticleController.create);

router.put("/:id", authorize("articles:update"), ArticleController.update);

router.delete("/:id", authorize("articles:delete"), ArticleController.delete);

export default router;