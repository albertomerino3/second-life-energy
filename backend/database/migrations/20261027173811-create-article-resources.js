'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("article_resources", {
      article_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          references: { model: "article", key: "id"},
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      resource_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          references: { model: "resource", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      created_at: { type: Sequelize.DATE },
      updated_at : { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('article_resources');
  }
};
