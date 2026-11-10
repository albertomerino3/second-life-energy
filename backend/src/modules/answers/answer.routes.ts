import { Router } from "express";
import { AnswerController } from "./answer.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("answers:read"), AnswerController.getAll);
router.get("/question/:questionId", authorize("answers:read"), AnswerController.getByQuestionId);
router.get("/:id", authorize("answers:read"), AnswerController.getById);
router.post("/", authorize("answers:read"), AnswerController.create);
router.put("/:id", authorize("answers:read"), AnswerController.update);
router.delete("/:id", authorize("answers:read"), AnswerController.delete);

export default router;
