'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("article_reviews", {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      article_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "article", key: "id"},
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      reviewer_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "reviewer", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      decision: {
          type: Sequelize.STRING(300),
          allowNull: false,
      },
      comments: {
          type: Sequelize.STRING(300),
          allowNull: false,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('article_reviews');
  }
};
