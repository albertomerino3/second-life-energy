'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('articles', [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};