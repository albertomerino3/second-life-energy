import { Router } from "express";
import { ArticleImageController } from "./article-image.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("article-images:read"), ArticleImageController.getAll);

router.get("/:id", authorize("article-images:read"), ArticleImageController.getById);

router.post("/", authorize("article-images:read"), ArticleImageController.create);

router.put("/:id", authorize("article-images:read"), ArticleImageController.update);

router.delete("/:id", authorize("article-images:read"), ArticleImageController.delete);

export default router;