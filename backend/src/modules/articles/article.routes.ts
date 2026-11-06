import { Router } from "express";
import { ArticleController } from "./article.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", ArticleController.getAll);

router.get("/:id", validateIdParams, ArticleController.getById);

router.post("/", ArticleController.create);

router.put("/:id", validateIdParams, ArticleController.update);

router.delete("/:id", validateIdParams, ArticleController.delete);

export default router;