import { Router } from "express";
import { SimulationResourceController } from "./simulation-resource.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", SimulationResourceController.getAll);
router.get("/:simulationId/:resourceId", validateIdParams, SimulationResourceController.getById);
router.post("/", SimulationResourceController.create);
router.delete("/:simulationId/:resourceId", validateIdParams, SimulationResourceController.delete);

export default router;