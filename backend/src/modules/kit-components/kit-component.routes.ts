import { Router } from "express";
import { KitComponentController } from "./kit-component.controller.js";

const router = Router();

router.get("/", KitComponentController.getAll);

router.get("/:id", KitComponentController.getById);

router.post("/", KitComponentController.create);

router.put("/:id", KitComponentController.update);

router.delete("/:id", KitComponentController.delete);

export default router;