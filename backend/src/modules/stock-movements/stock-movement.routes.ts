import { Router } from "express";
import { StockMovementController } from "./stock-movement.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("stock-movements:read"), StockMovementController.getAll);

router.get("/:id", authorize("stock-movements:read"), StockMovementController.getById);

router.post("/", authorize("stock-movements:read"), StockMovementController.create);

router.put("/:id", authorize("stock-movements:read"), StockMovementController.update);

router.delete("/:id", authorize("stock-movements:read"), StockMovementController.delete);

export default router;
