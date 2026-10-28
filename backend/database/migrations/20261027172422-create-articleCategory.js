'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("article_category", {
      id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING(100),
          allowNull: true,
          unique: true,
      },
      description: {
          type: DataTypes.STRING(200),
          allowNull: false,
      },
      parentCategoryId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
      },
      created_at: { type: Sequelize.DATE},
      updated_at: { type: Sequelize.DATE},
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('article_category');
  }
};
