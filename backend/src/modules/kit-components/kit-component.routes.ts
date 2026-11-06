import { Router } from "express";
import { KitComponentController } from "./kit-component.controller.js";

const router = Router();

router.get("/", KitComponentController.getAll);

router.get("/:kitId/:componentId", KitComponentController.getById);

router.post("/", KitComponentController.create);

router.put("/:kitId/:componentId", KitComponentController.update);

router.delete("/:kitId/:componentId", KitComponentController.delete);

export default router;
