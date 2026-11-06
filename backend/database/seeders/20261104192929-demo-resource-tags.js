'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('resource_tags', [
      { 
        resource_id: 1,
        tag_id: 1
      },
      { 
        resource_id: 2,
        tag_id: 2
      },
      { 
        resource_id: 3,
        tag_id: 3
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resource_tags', null, {});
  }
};