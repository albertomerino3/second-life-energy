'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resources', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('resources');
  }
};