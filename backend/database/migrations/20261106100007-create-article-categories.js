'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("article_categories", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      parent_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "article_categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("article_categories");
  },
};
