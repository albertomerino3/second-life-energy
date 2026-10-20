import { Router } from "express";
import { BicycleDetailController } from "./article.controller.js";

const router = Router();

router.get("/", BicycleDetailController.getAll);

router.get("/:id", BicycleDetailController.getById);

router.post("/", BicycleDetailController.create);

router.put("/:id", BicycleDetailController.update);

router.delete("/:id", BicycleDetailController.delete);

export default router;