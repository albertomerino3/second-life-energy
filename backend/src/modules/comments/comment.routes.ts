import { Router } from "express";
import { CommentController } from "./comment.controller.js";

const router = Router();

router.get("/", CommentController.getAll);

router.get("/status/:status", CommentController.getByStatus);

router.get("/article/:articleId", CommentController.getByArticle);

router.get("/user/:userId", CommentController.getByUser);

router.get("/rating", CommentController.getByRating);

router.get("/search", CommentController.search);

router.get("/:id", CommentController.getById);

router.post("/", CommentController.create);

router.put("/:id", CommentController.update);

router.delete("/:id", CommentController.delete);

export default router;