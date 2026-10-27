'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("articleReview", {
      id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      articleId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
      },
      reviewerId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
      },
      decision: {
          type: DataTypes.STRING(300),
          allowNull: false,
      },
      comments: {
          type: DataTypes.STRING(300),
          allowNull: false,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('articleReview');
  }
};
