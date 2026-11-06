import { Moderation } from "./moderation.model.js";
import { Question } from "../questions/question.model.js";
import { Answer } from "../answers/answer.model.js";
import { User } from "../users/user.model.js";
import { sequelize } from "../../config/database.js";
import { HttpError } from "../../utils/http-error.js";

const includeRelations = [
  { model: User, as: "moderator", attributes: ["id", "name"] },
  { model: Question, as: "question", attributes: ["id", "title", "status", "authorId"] },
  { model: Answer, as: "answer", attributes: ["id", "content", "status", "authorId"] },
];

export class ModerationService {
  // Retrieve all moderation logs
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

  // Retrieve a single moderation log by ID
  static async findById(id: number) {
    return Moderation.findByPk(id, {
      include: includeRelations,
    });
  }

  // HU-09: hide or restore a message. The moderation is recorded and the
  // status of the question/answer changes in the same transaction. The
  // original author is kept untouched.
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
        if (!question) throw new HttpError(404, "Question not found");
        const restoredStatus = question.acceptedAnswerId ? "solved" : "open";
        await question.update({ status: created.action === "hide" ? "hidden" : restoredStatus }, { transaction });
      } else if (created.answerId) {
        const answer = await Answer.findByPk(created.answerId, { transaction });
        if (!answer) throw new HttpError(404, "Answer not found");
        await answer.update({ status: created.action === "hide" ? "hidden" : "published" }, { transaction });
      }

      return created;
    });

    return ModerationService.findById(moderation.id);
  }

  // Only the reason can be corrected: the action already applied is history
  static async update(moderation: Moderation, data: { reason?: string }) {
    return moderation.update(data, { fields: ["reason"] });
  }

  static async delete(moderation: Moderation) {
    await moderation.destroy();
  }
}
