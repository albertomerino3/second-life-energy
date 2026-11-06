import { Answer } from "./answer.model.js";
import { Question } from "../questions/question.model.js";
import { User } from "../users/user.model.js";

const includeRelations = [
  { model: User, as: "author", attributes: ["id", "name"] },
  { model: Question, as: "question", attributes: ["id", "title", "status"] },
];

export class AnswerService {
  static async findAll(filters: { questionId?: number } = {}) {
    return Answer.findAll({
      where: filters.questionId ? { questionId: filters.questionId } : {},
      include: includeRelations,
      order: [["id", "ASC"]],
    });
  }

  static async findByQuestionId(questionId: number) {
    return AnswerService.findAll({ questionId });
  }

  static async findById(id: number) {
    return Answer.findByPk(id, {
      include: includeRelations,
    });
  }

  static async create(data: { questionId: number; authorId: number; content: string; status?: string }) {
    return Answer.create(data);
  }

  static async update(answer: Answer, data: { content?: string; status?: string }) {
    return answer.update(data, { fields: ["content", "status"] });
  }

  static async delete(answer: Answer) {
    await answer.destroy();
  }
}
