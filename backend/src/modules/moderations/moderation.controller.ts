import { Request, Response } from 'express';
import { ModerationService } from './moderation.service.js';

const moderationService = new ModerationService();

export class ModerationController {
  // GET /moderations
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await moderationService.getAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving moderations', error });
    }
  }

  // GET /moderations/:id
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await moderationService.getById(id);
      if (!item) {
        res.status(404).json({ message: 'Moderation record not found' });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving moderation record', error });
    }
  }

  // POST /moderations
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await moderationService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: 'Error creating moderation record', error });
    }
  }
}