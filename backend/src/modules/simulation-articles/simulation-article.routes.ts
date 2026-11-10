import { Router } from "express";
import { SimulationArticleController } from "./simulation-article.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("simulation-articles:read"), SimulationArticleController.getAll);
router.get("/:simulationId/:articleId", authorize("simulation-articles:read"), SimulationArticleController.getById);
router.post("/", authorize("simulation-articles:read"), SimulationArticleController.create);
router.delete("/:simulationId/:articleId", authorize("simulation-articles:read"), SimulationArticleController.delete);

export default router;