import { Request, Response } from 'express';
import { PermissionService } from './permissions.service.js';

const permissionService = new PermissionService();

export class PermissionController {
  // GET /permissions
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await permissionService.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving permissions', error });
    }
  }

  // GET /permissions/:id
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const item = await permissionService.getById(id);
      if (!item) {
        res.status(404).json({ message: 'Permission not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving permission', error });
    }
  }

  // POST /permissions
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const created = await permissionService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: 'Error creating permission', error });
    }
  }

  // PUT /permissions/:id
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await permissionService.update(id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Permission not found' });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: 'Error updating permission', error });
    }
  }

  // DELETE /permissions/:id
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await permissionService.delete(id);
      if (!deleted) {
        res.status(404).json({ message: 'Permission not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting permission', error });
    }
  }
}