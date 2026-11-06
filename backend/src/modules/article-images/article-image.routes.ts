import { Router } from "express";
import { ArticleImageController } from "./article-image.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ArticleImageController.getAll);

router.get("/:id", validateIdParams, ArticleImageController.getById);

router.post("/", ArticleImageController.create);

router.put("/:id", validateIdParams, ArticleImageController.update);

router.delete("/:id", validateIdParams, ArticleImageController.delete);

export default router;