'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("simulation_articles", {
      simulation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "simulations", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      article_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: "articles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("simulation_articles");
  },
};
