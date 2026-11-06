import { Request, Response, NextFunction } from "express";
import { QuestionService } from "./question.service.js";

export class QuestionController {
  // GET /questions?search=&categoryId=&status=
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await QuestionService.findAll({
        search: typeof req.query.search === "string" ? req.query.search : undefined,
        categoryId: Number(req.query.categoryId) || undefined,
        status: typeof req.query.status === "string" ? req.query.status : undefined,
      });
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  // GET /questions/:id
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await QuestionService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Question not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  // GET /questions/category/:categoryId
  static async getByCategoryId(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = Number(req.params.categoryId);
      const items = await QuestionService.findByCategoryId(categoryId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  // POST /questions
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId, authorId, title, content, status } = req.body;
      if (!categoryId || !authorId || !title || !content) {
        res.status(400).json({ message: "categoryId, authorId, title and content are required" });
        return;
      }
      const created = await QuestionService.create({ categoryId, authorId, title, content, status });
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  // PUT /questions/:id
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await QuestionService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Question not found" });
        return;
      }
      const updated = await QuestionService.update(item, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /questions/:id
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await QuestionService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Question not found" });
        return;
      }
      await QuestionService.delete(item);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
