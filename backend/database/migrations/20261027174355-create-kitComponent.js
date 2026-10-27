'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("kitComponent", {
      id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
      },
      kitId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
      },
      componentId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
      },
      quantity: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          validate: { min: 1 },
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('kitComponent');
  }
};
