'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("kit_components", {
      id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      kit_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        references: { model: "kit", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      component_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: { model: "component", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT"
      },
      quantity: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          validate: { min: 1 },
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('kit_components');
  }
};
