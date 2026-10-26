import { ForumCategory } from './/forum-category.model.js';

export class ForumCategoryService {
  // All forum categories
  async getAll(): Promise<ForumCategory[]> {
    return await ForumCategory.findAll();
  }

  // A single forum category by ID
  async getById(id: number): Promise<ForumCategory | null> {
    return await ForumCategory.findByPk(id);
  }

  // Create a new forum category
  async create(data: any): Promise<ForumCategory> {
    return await ForumCategory.create(data);
  }

  // Update a forum category by ID
  async update(id: number, data: any): Promise<ForumCategory | null> {
    const item = await ForumCategory.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }

  // Delete a forum category by ID
  async delete(id: number): Promise<boolean> {
    const deletedCount = await ForumCategory.destroy({ where: { id } });
    return deletedCount > 0;
  }
}