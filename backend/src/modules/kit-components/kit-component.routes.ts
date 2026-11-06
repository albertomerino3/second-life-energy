import { Router } from "express";
import { KitComponentController } from "./kit-component.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", KitComponentController.getAll);

router.get("/:kitId/:componentId", validateIdParams, KitComponentController.getById);

router.post("/", KitComponentController.create);

router.put("/:kitId/:componentId", validateIdParams, KitComponentController.update);

router.delete("/:kitId/:componentId", validateIdParams, KitComponentController.delete);

export default router;
