'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("simulation_articles", [
      { simulation_id: 1, article_id: 1 },
      { simulation_id: 1, article_id: 5 },
      { simulation_id: 2, article_id: 3 },
      { simulation_id: 2, article_id: 6 },
      { simulation_id: 3, article_id: 4 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("simulation_articles", { simulation_id: [1, 2, 3] });
  },
};
