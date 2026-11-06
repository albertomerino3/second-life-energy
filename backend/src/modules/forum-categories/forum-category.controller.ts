import { Request, Response, NextFunction } from "express";
import { ForumCategoryService } from "./forum-category.service.js";

export class ForumCategoryController {
  // GET /forum-categories
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await ForumCategoryService.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  // GET /forum-categories/:id
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await ForumCategoryService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Forum category not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  // POST /forum-categories
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      if (!name) {
        res.status(400).json({ message: "name is required" });
        return;
      }
      const created = await ForumCategoryService.create({ name, description });
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  // PUT /forum-categories/:id
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await ForumCategoryService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Forum category not found" });
        return;
      }
      const updated = await ForumCategoryService.update(item, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /forum-categories/:id
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await ForumCategoryService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Forum category not found" });
        return;
      }
      await ForumCategoryService.delete(item);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
