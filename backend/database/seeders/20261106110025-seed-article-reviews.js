'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("article_reviews", [
      { id: 1, article_id: 1, reviewer_id: 2, decision: "approved", comments: "Kit completo y bien documentado.", created_at: now },
      { id: 2, article_id: 2, reviewer_id: 1, decision: "approved", comments: null, created_at: now },
      // Kit created by a student and returned with observations (HU-11)
      { id: 3, article_id: 3, reviewer_id: 3, decision: "returned", comments: "Falta la lista de componentes y alguna foto del montaje.", created_at: now },
    ]);

    await resetSequence(queryInterface, "article_reviews");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_reviews", { id: [1, 2, 3] });
  },
};
