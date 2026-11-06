import { Request, Response, NextFunction } from "express";
import { ModerationService } from "./moderation.service.js";

export class ModerationController {
  // GET /moderations?questionId=&answerId=
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await ModerationService.findAll({
        questionId: Number(req.query.questionId) || undefined,
        answerId: Number(req.query.answerId) || undefined,
      });
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  // GET /moderations/:id
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await ModerationService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Moderation record not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  // POST /moderations
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { moderatorId, questionId, answerId, action, reason } = req.body;
      if (!moderatorId || !action || !reason) {
        res.status(400).json({ message: "moderatorId, action and reason are required" });
        return;
      }
      if (Boolean(questionId) === Boolean(answerId)) {
        res.status(400).json({ message: "Either questionId or answerId must be provided (not both)" });
        return;
      }
      const created = await ModerationService.create({ moderatorId, questionId, answerId, action, reason });
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  // PUT /moderations/:id
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await ModerationService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Moderation record not found" });
        return;
      }
      const updated = await ModerationService.update(item, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /moderations/:id
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await ModerationService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Moderation record not found" });
        return;
      }
      await ModerationService.delete(item);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
