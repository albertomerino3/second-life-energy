'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("request_items", {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      request_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "request", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      article_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "article", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      quantity: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          validate: { min: 1 },
      },
      created_at: { type:Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('request_items');
  }
};
