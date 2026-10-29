'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("article_categories", {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: Sequelize.STRING(100),
          allowNull: true,
          unique: true,
      },
      description: {
          type: Sequelize.STRING(200),
          allowNull: false,
      },
      parent_category_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
      },
      created_at: { type: Sequelize.DATE},
      updated_at: { type: Sequelize.DATE},
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('article_categories');
  }
};
