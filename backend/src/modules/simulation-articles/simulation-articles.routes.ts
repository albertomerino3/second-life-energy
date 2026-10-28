import { Router } from "express";
import { SimulationArticleController } from "./simulation-article.controller.js";

const router = Router();

router.get("/", SimulationArticleController.getAll);
router.get("/:simulationId/:articleId", SimulationArticleController.getById);
router.post("/", SimulationArticleController.create);
router.delete("/:simulationId/:articleId", SimulationArticleController.delete);

export default router;