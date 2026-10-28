'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("article_review", {
      id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      articleId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "article", key: "id"},
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      reviewerId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "reviewer", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
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
    await queryInterface.dropTable('article_review');
  }
};
