import { ForumCategory } from "./forum-category.model.js";
import { Question } from "../questions/question.model.js";

export class ForumCategoryService {
  // All forum categories
  static async findAll() {
    return ForumCategory.findAll({
      order: [["id", "ASC"]],
    });
  }

  // A single forum category with its visible questions
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

  // Create a new forum category
  static async create(data: { name: string; description?: string | null }) {
    return ForumCategory.create(data);
  }

  // Update a forum category
  static async update(
    forumCategory: ForumCategory,
    data: { name?: string; description?: string | null }
  ) {
    return forumCategory.update(data, { fields: ["name", "description"] });
  }

  // Delete a forum category
  static async delete(forumCategory: ForumCategory) {
    await forumCategory.destroy();
  }
}
