
import { Router } from "express";
import { QuestionReportController } from "./question-reports.controller.js";

const router = Router();

router.get("/", QuestionReportController.getAll);

// Consultas específicas: siempre antes de /:id
router.get("/pending-questions", QuestionReportController.getQuestionsWithPendingReports);
router.get("/detailed", QuestionReportController.getDetailed);
router.get("/question/:questionId", QuestionReportController.getByQuestionId);
router.get("/question-status/:status", QuestionReportController.getByQuestionStatus);
router.get("/severity/:min", QuestionReportController.getBySeverity);
router.get("/search/:text", QuestionReportController.search);

router.get("/:id", QuestionReportController.getById);
router.post("/", QuestionReportController.create);
router.put("/:id", QuestionReportController.update);
router.delete("/:id", QuestionReportController.delete);

export default router;
