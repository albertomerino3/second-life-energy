import { Router } from "express";
import { SimulationController } from "./simulation.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("simulations:read"), SimulationController.getAll);

router.get("/:id", authorize("simulations:read"), SimulationController.getById);

router.post("/", authorize("simulations:create"), SimulationController.create);

router.put("/:id", authorize("simulations:update"), SimulationController.update);

router.delete("/:id", authorize("simulations:delete"), SimulationController.delete);

export default router;