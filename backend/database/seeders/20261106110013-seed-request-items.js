'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Max. 1 unit per kit and 10 per component (HU-04)
    await queryInterface.bulkInsert("request_items", [
      { id: 1, request_id: 1, article_id: 1, quantity: 1 },
      { id: 2, request_id: 1, article_id: 9, quantity: 10 },
      { id: 3, request_id: 2, article_id: 4, quantity: 2 },
      { id: 4, request_id: 2, article_id: 6, quantity: 1 },
    ]);

    await resetSequence(queryInterface, "request_items");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("request_items", { id: [1, 2, 3, 4] });
  },
};
