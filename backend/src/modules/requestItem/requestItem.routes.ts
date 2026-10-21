import { Router } from "express";
import { RequestItemController } from "./requestItem.controller.js";

const router = Router();

router.get("/", RequestItemController.getAll);

router.get("/:id", RequestItemController.getById);

router.post("/", RequestItemController.create);

router.put("/:id", RequestItemController.update);

router.delete("/:id", RequestItemController.delete);

export default router;