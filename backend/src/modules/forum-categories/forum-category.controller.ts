import { Request, Response } from 'express';
import { ForumCategoryService } from './forum-category.service.js';

const forumCategoryService = new ForumCategoryService();

export class ForumCategoryController {
  // GET /forum-categories
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await forumCategoryService.getAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving forum categories', error });
    }
  }

  // GET /forum-categories/:id
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await forumCategoryService.getById(id);
      if (!item) {
        res.status(404).json({ message: 'Forum category not found' });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving forum category', error });
    }
  }

  // POST /forum-categories
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await forumCategoryService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: 'Error creating forum category', error });
    }
  }

  // PUT /forum-categories/:id
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await forumCategoryService.update(id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Forum category not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: 'Error updating forum category', error });
    }
  }

  // DELETE /forum-categories/:id
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await forumCategoryService.delete(id);
      if (!deleted) {
        res.status(404).json({ message: 'Forum category not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting forum category', error });
    }
  }
}