import { Answer } from "./answer.model.js";
import { Question } from "../questions/question.model.js";
import { User } from "../users/user.model.js";

const includeRelations = [
  { model: User, as: "author", attributes: ["id", "name"] },
  { model: Question, as: "question", attributes: ["id", "title", "status"] },
];

export class AnswerService {
  // All answers, optionally of one question
  static async findAll(filters: { questionId?: number } = {}) {
    return Answer.findAll({
      where: filters.questionId ? { questionId: filters.questionId } : {},
      include: includeRelations,
      order: [["id", "ASC"]],
    });
  }

  // All answers for a specific question
  static async findByQuestionId(questionId: number) {
    return AnswerService.findAll({ questionId });
  }

  // A single answer by ID
  static async findById(id: number) {
    return Answer.findByPk(id, {
      include: includeRelations,
    });
  }

  // Create a new answer
  static async create(data: { questionId: number; authorId: number; content: string; status?: string }) {
    return Answer.create(data);
  }

  // Update an answer (the author and the question cannot change)
  static async update(answer: Answer, data: { content?: string; status?: string }) {
    return answer.update(data, { fields: ["content", "status"] });
  }

  // Delete an answer
  static async delete(answer: Answer) {
    await answer.destroy();
  }
}
