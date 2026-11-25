import { Router } from "express";
import { SimulationResourceController } from "./simulation-resource.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("simulation-resources:read"), SimulationResourceController.getAll);
router.get("/:simulationId/:resourceId", authorize("simulation-resources:read"), SimulationResourceController.getById);
router.post("/", authorize("simulation-resources:read"), SimulationResourceController.create);
router.delete("/:simulationId/:resourceId", authorize("simulation-resources:read"), SimulationResourceController.delete);

export default router;