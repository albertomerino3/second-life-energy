'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("moderations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      moderator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "questions", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      answer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "answers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      action: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      reason: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("moderations");
  },
};
