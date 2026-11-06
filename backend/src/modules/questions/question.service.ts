import { Op, WhereOptions } from "sequelize";
import { Question } from "./question.model.js";
import { Answer } from "../answers/answer.model.js";
import { ForumCategory } from "../forum-categories/forum-category.model.js";
import { User } from "../users/user.model.js";
import { HttpError } from "../../utils/http-error.js";

const includeSummary = [
  { model: ForumCategory, as: "category", attributes: ["id", "name"] },
  { model: User, as: "author", attributes: ["id", "name"] },
];

export class QuestionService {
  // All questions (HU-09: search by text and filter by category / status)
  static async findAll(filters: { search?: string; categoryId?: number; status?: string } = {}) {
    const where: WhereOptions = {};
    if (filters.search) {
      Object.assign(where, {
        [Op.or]: [
          { title: { [Op.iLike]: `%${filters.search}%` } },
          { content: { [Op.iLike]: `%${filters.search}%` } },
        ],
      });
    }
    if (filters.categoryId) {
      Object.assign(where, { categoryId: filters.categoryId });
    }
    if (filters.status) {
      Object.assign(where, { status: filters.status });
    }

    return Question.findAll({
      where,
      include: includeSummary,
      order: [["id", "ASC"]],
    });
  }

  // A question with its answers and the accepted solution
  static async findById(id: number) {
    return Question.findByPk(id, {
      include: [
        ...includeSummary,
        { model: Answer, as: "acceptedAnswer", attributes: ["id", "content", "authorId"] },
        {
          model: Answer,
          as: "answers",
          attributes: ["id", "content", "status", "createdAt"],
          include: [{ model: User, as: "author", attributes: ["id", "name"] }],
        },
      ],
      order: [[{ model: Answer, as: "answers" }, "id", "ASC"]],
    });
  }

  // Questions filtered by category ID
  static async findByCategoryId(categoryId: number) {
    return QuestionService.findAll({ categoryId });
  }

  // Create a new question
  static async create(data: { categoryId: number; authorId: number; title: string; content: string; status?: string }) {
    return Question.create(data);
  }

  // Update a question (HU-09: mark the solution with acceptedAnswerId)
  static async update(
    question: Question,
    data: { categoryId?: number; title?: string; content?: string; status?: string; acceptedAnswerId?: number | null }
  ) {
    const changes = { ...data };

    if (data.acceptedAnswerId) {
      const answer = await Answer.findByPk(data.acceptedAnswerId);
      if (!answer || answer.questionId !== question.id) {
        throw new HttpError(400, "The accepted answer must belong to this question");
      }
      changes.status = data.status ?? "solved";
    }

    await question.update(changes, {
      fields: ["categoryId", "title", "content", "status", "acceptedAnswerId"],
    });
    return QuestionService.findById(question.id);
  }

  // Delete a question
  static async delete(question: Question) {
    await question.destroy();
  }
}
