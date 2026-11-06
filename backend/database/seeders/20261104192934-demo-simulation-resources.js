'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('simulation_articles', [
      { 
        simulation_id: 1,
        article_id: 1
      },
      { 
        simulation_id: 2,
        article_id: 2
      },
      { 
        simulation_id: 3,
        article_id: 3
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('simulation_articles', null, {});
  }
};