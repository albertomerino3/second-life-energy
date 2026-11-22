"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("comments", [
      {
        articleId: 1,
        userId: 1,
        content: "Great article!",
        rating: 5,
        status: "approved",
        createdAt: new Date(),
      },
      {
        articleId: 1,
        userId: 1,
        content: "I have some questions.",
        rating: 3,
        status: "pending",
        createdAt: new Date(),
      },
      {
        articleId: 1,
        userId: 1,
        content: "This information is not useful.",
        rating: 1,
        status: "rejected",
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};