import { Request, Response } from 'express';
import { QuestionService } from './/question.service.js';

const questionService = new QuestionService();

export class QuestionController {
  // GET /questions
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await questionService.getAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving questions', error });
    }
  }

  // GET /questions/:id
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await questionService.getById(id);
      if (!item) {
        res.status(404).json({ message: 'Question not found' });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving question', error });
    }
  }

  // GET /questions/category/:categoryId
  static async getByCategoryId(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = Number(req.params.categoryId);
      const items = await questionService.getByCategoryId(categoryId);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving questions by category', error });
    }
  }

  // POST /questions
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await questionService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: 'Error creating question', error });
    }
  }

  // PUT /questions/:id
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await questionService.update(id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Question not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: 'Error updating question', error });
    }
  }

  // DELETE /questions/:id
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await questionService.delete(id);
      if (!deleted) {
        res.status(404).json({ message: 'Question not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting question', error });
    }
  }
}