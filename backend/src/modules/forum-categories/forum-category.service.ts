import { ForumCategory } from "./forum-category.model.js";
import { Question } from "../questions/question.model.js";

export class ForumCategoryService {
  static async findAll() {
    return ForumCategory.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return ForumCategory.findByPk(id, {
      include: [
        {
          model: Question,
          as: "questions",
          attributes: ["id", "title", "status", "createdAt"],
          where: { status: ["open", "solved"] },
          required: false,
        },
      ],
    });
  }

  static async create(data: { name: string; description?: string | null }) {
    return ForumCategory.create(data);
  }

  static async update(
    forumCategory: ForumCategory,
    data: { name?: string; description?: string | null }
  ) {
    return forumCategory.update(data, { fields: ["name", "description"] });
  }

  static async delete(forumCategory: ForumCategory) {
    await forumCategory.destroy();
  }
}
