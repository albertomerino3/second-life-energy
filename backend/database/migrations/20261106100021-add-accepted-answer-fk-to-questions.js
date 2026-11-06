'use strict';

// questions.accepted_answer_id -> answers.id
// Added in its own migration because "answers" depends on "questions"
// (circular relationship "acceptedAsSolution" in the ERD).

/** @type {import('sequelize-cli').Migration} */
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
