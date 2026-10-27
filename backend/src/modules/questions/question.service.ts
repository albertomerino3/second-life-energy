import { Question } from './question.model.js';

export class QuestionService {
  // All questions
  async getAll(): Promise<Question[]> {
    return await Question.findAll();
  }

  // A question by ID
  async getById(id: number): Promise<Question | null> {
    return await Question.findByPk(id);
  }

  // Retrieve questions filtered by category ID
  async getByCategoryId(categoryId: number): Promise<Question[]> {
    return await Question.findAll({ where: { categoryId } });
  }

  // Create a new question
  async create(data: any): Promise<Question> {
    return await Question.create(data);
  }

  // Update a question by ID
  async update(id: number, data: any): Promise<Question | null> {
    const item = await Question.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }

  // Delete a question by ID
  async delete(id: number): Promise<boolean> {
    const deletedCount = await Question.destroy({ where: { id } });
    return deletedCount > 0;
  }
}