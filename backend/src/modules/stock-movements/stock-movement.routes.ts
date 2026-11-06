import { Router } from "express";
import { StockMovementController } from "./stock-movement.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", StockMovementController.getAll);

router.get("/:id", validateIdParams, StockMovementController.getById);

router.post("/", StockMovementController.create);

router.put("/:id", validateIdParams, StockMovementController.update);

router.delete("/:id", validateIdParams, StockMovementController.delete);

export default router;
