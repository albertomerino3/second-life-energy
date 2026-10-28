import { Permission } from './permission.model.js';

export class PermissionService {
  async getAll(): Promise<Permission[]> {
    return await Permission.findAll();
  }

  async getById(id: number): Promise<Permission | null> {
    return await Permission.findByPk(id);
  }

  async create(data: any): Promise<Permission> {
    return await Permission.create(data);
  }

  async update(id: number, data: any): Promise<Permission | null> {
    const item = await Permission.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await Permission.destroy({ where: { id } });
    return deleted > 0;
  }
}