import { Router } from "express";
import { ArticleResourceController } from "./articleResource.controller.js";

const router = Router();

router.get("/", ArticleResourceController.getAll);

router.get("/:id", ArticleResourceController.getById);

router.post("/", ArticleResourceController.create);

router.put("/:id", ArticleResourceController.update);

router.delete("/:id", ArticleResourceController.delete);

export default router;