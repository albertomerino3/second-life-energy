import { Router } from "express";
import { SimulationResourceController } from "./simulation-resource.controller.js";

const router = Router();

router.get("/", SimulationResourceController.getAll);
router.get("/:simulationId/:resourceId", SimulationResourceController.getById);
router.post("/", SimulationResourceController.create);
router.delete("/:simulationId/:resourceId", SimulationResourceController.delete);

export default router;