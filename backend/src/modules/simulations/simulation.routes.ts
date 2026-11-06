import { Router } from "express";
import { SimulationController } from "./simulation.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", SimulationController.getAll);

router.get("/:id", validateIdParams, SimulationController.getById);

router.post("/", SimulationController.create);

router.put("/:id", validateIdParams, SimulationController.update);

router.delete("/:id", validateIdParams, SimulationController.delete);

export default router;