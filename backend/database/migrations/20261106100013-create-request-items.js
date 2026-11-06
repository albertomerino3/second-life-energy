'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("request_items", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "requests", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "articles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });

    await queryInterface.addConstraint("request_items", {
      fields: ["request_id", "article_id"],
      type: "unique",
      name: "request_items_request_id_article_id_uk",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("request_items");
  },
};
