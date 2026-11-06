'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("questions", {
      fields: ["accepted_answer_id"],
      type: "foreign key",
      name: "questions_accepted_answer_id_fk",
      references: { table: "answers", field: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("questions", "questions_accepted_answer_id_fk");
  },
};
