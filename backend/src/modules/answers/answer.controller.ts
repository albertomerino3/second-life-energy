import { Request, Response } from 'express';
import { AnswerService } from './answer.service.js';

const answerService = new AnswerService();

export class AnswerController {
  // GET /answers/question/:questionId
  static async getByQuestionId(req: Request, res: Response): Promise<void> {
    try {
      const questionId = Number(req.params.questionId);
      const items = await answerService.getByQuestionId(questionId);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving answers', error });
    }
  }

  // GET /answers/:id
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await answerService.getById(id);
      if (!item) {
        res.status(404).json({ message: 'Answer not found' });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving answer', error });
    }
  }

  // POST /answers
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await answerService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: 'Error creating answer', error });
    }
  }

  // PUT /answers/:id
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await answerService.update(id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Answer not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: 'Error updating answer', error });
    }
  }

  // DELETE /answers/:id
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await answerService.delete(id);
      if (!deleted) {
        res.status(404).json({ message: 'Answer not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting answer', error });
    }
  }
}