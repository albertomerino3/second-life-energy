'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("requestItem", {
      id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      requestId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "request", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      articleId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "article", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      quantity: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          validate: { min: 1 },
      },
      created_at: { type:Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('requestItem');
  }
};
