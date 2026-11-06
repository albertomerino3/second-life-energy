import { Router } from "express";
import { RequestController } from "./request.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", RequestController.getAll);

router.get("/:id", validateIdParams, RequestController.getById);

router.post("/", RequestController.create);

router.put("/:id", validateIdParams, RequestController.update);

router.delete("/:id", validateIdParams, RequestController.delete);

export default router;
