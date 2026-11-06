import { Router } from "express";
import { RequestItemController } from "./request-item.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", RequestItemController.getAll);

router.get("/:id", validateIdParams, RequestItemController.getById);

router.post("/", RequestItemController.create);

router.put("/:id", validateIdParams, RequestItemController.update);

router.delete("/:id", validateIdParams, RequestItemController.delete);

export default router;