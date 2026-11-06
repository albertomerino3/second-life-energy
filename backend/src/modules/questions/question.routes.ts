import { Router } from "express";
import { QuestionController } from "./question.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", QuestionController.getAll);
router.get("/category/:categoryId", validateIdParams, QuestionController.getByCategoryId);
router.get("/:id", validateIdParams, QuestionController.getById);
router.post("/", QuestionController.create);
router.put("/:id", validateIdParams, QuestionController.update);
router.delete("/:id", validateIdParams, QuestionController.delete);

export default router;
