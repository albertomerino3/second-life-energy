import { Request, Response, NextFunction } from "express";
import { AnswerService } from "./answer.service.js";

export class AnswerController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId = Number(req.query.questionId) || undefined;
      const items = await AnswerService.findAll({ questionId });
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getByQuestionId(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId = Number(req.params.questionId);
      const items = await AnswerService.findByQuestionId(questionId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await AnswerService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Answer not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { questionId, authorId, content, status } = req.body;
      if (!questionId || !authorId || !content) {
        res.status(400).json({ message: "questionId, authorId and content are required" });
        return;
      }
      const created = await AnswerService.create({ questionId, authorId, content, status });
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await AnswerService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Answer not found" });
        return;
      }
      const updated = await AnswerService.update(item, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await AnswerService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Answer not found" });
        return;
      }
      await AnswerService.delete(item);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
