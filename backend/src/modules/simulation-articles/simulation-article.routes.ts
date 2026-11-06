import { Router } from "express";
import { SimulationArticleController } from "./simulation-article.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", SimulationArticleController.getAll);
router.get("/:simulationId/:articleId", validateIdParams, SimulationArticleController.getById);
router.post("/", SimulationArticleController.create);
router.delete("/:simulationId/:articleId", validateIdParams, SimulationArticleController.delete);

export default router;