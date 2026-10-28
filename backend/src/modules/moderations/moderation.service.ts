import { Moderation } from './moderation.model.js';

export class ModerationService {
  // Retrieve all moderation logs
  async getAll(): Promise<Moderation[]> {
    return await Moderation.findAll();
  }

  // Retrieve a single moderation log by ID
  async getById(id: number): Promise<Moderation | null> {
    return await Moderation.findByPk(id);
  }

  // Create a new moderation log
  async create(data: any): Promise<Moderation> {
    return await Moderation.create(data);
  }
}