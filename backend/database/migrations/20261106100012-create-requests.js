'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("requests", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      // Fictitious reference, e.g. "DEMO-2026-0001" (HU-05)
      reference: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      contact_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      contact_email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // "draft" | "confirmed" | "cancelled"
      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "draft",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("requests");
  },
};
