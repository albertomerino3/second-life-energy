import { Router } from "express";
import { QuestionController } from "./question.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("questions:read"), QuestionController.getAll);
router.get("/category/:categoryId", authorize("questions:read"), QuestionController.getByCategoryId);
router.get("/:id", authorize("questions:read"), QuestionController.getById);
router.post("/", authorize("questions:read"), QuestionController.create);
router.put("/:id", authorize("questions:read"), QuestionController.update);
router.delete("/:id", authorize("questions:read"), QuestionController.delete);

export default router;
