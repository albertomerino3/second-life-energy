import { Router } from "express";
import { AnswerController } from "./answer.controller.js";
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get("/", AnswerController.getAll);
router.get("/question/:questionId", validateIdParams, AnswerController.getByQuestionId);
router.get("/:id", validateIdParams, AnswerController.getById);
router.post("/", AnswerController.create);
router.put("/:id", validateIdParams, AnswerController.update);
router.delete("/:id", validateIdParams, AnswerController.delete);

export default router;
