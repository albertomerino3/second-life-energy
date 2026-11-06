import { Moderation } from "./moderation.model.js";
import { Question } from "../questions/question.model.js";
import { Answer } from "../answers/answer.model.js";
import { User } from "../users/user.model.js";
import { sequelize } from "../../config/database.js";

const includeRelations = [
  { model: User, as: "moderator", attributes: ["id", "name"] },
  { model: Question, as: "question", attributes: ["id", "title", "status", "authorId"] },
  { model: Answer, as: "answer", attributes: ["id", "content", "status", "authorId"] },
];

export class ModerationService {
  static async findAll(filters: { questionId?: number; answerId?: number } = {}) {
    const where: Record<string, number> = {};
    if (filters.questionId) where.questionId = filters.questionId;
    if (filters.answerId) where.answerId = filters.answerId;

    return Moderation.findAll({
      where,
      include: includeRelations,
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return Moderation.findByPk(id, {
      include: includeRelations,
    });
  }

  static async create(data: {
    moderatorId: number;
    questionId?: number | null;
    answerId?: number | null;
    action: string;
    reason: string;
  }) {
    const moderation = await sequelize.transaction(async (transaction) => {
      const created = await Moderation.create(
        { ...data, questionId: data.questionId ?? null, answerId: data.answerId ?? null },
        { transaction }
      );

      if (created.questionId) {
        const question = await Question.findByPk(created.questionId, { transaction });
        if (!question) return created;
        const restoredStatus = question.acceptedAnswerId ? "solved" : "open";
        await question.update({ status: created.action === "hide" ? "hidden" : restoredStatus }, { transaction });
      } else if (created.answerId) {
        const answer = await Answer.findByPk(created.answerId, { transaction });
        if (!answer) return created;
        await answer.update({ status: created.action === "hide" ? "hidden" : "published" }, { transaction });
      }

      return created;
    });

    return ModerationService.findById(moderation.id);
  }

  static async update(moderation: Moderation, data: { reason?: string }) {
    return moderation.update(data, { fields: ["reason"] });
  }

  static async delete(moderation: Moderation) {
    await moderation.destroy();
  }
}
