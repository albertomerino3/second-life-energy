import { Answer } from './answer.model.js';

export class AnswerService {
  // All answers for a specific question
  async getByQuestionId(questionId: number): Promise<Answer[]> {
    return await Answer.findAll({ where: { questionId } });
  }

  // A single answer by ID
  async getById(id: number): Promise<Answer | null> {
    return await Answer.findByPk(id);
  }

  // Create a new answer
  async create(data: any): Promise<Answer> {
    return await Answer.create(data);
  }

  // Update an answer by ID
  async update(id: number, data: any): Promise<Answer | null> {
    const item = await Answer.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }

  // Delete an answer by ID
  async delete(id: number): Promise<boolean> {
    const deletedCount = await Answer.destroy({ where: { id } });
    return deletedCount > 0;
  }
}