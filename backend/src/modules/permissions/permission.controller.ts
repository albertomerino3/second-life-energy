import { Request, Response, NextFunction } from "express";
import { PermissionService } from "./permissions.service.js";

export class PermissionController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await PermissionService.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await PermissionService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Permission not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { code, description } = req.body;
      if (!code) {
        res.status(400).json({ message: "code is required" });
        return;
      }
      const created = await PermissionService.create({ code, description });
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await PermissionService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Permission not found" });
        return;
      }
      const updated = await PermissionService.update(item, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await PermissionService.findById(id);
      if (!item) {
        res.status(404).json({ message: "Permission not found" });
        return;
      }
      await PermissionService.delete(item);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
