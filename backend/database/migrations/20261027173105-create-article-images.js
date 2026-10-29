'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("article_images", {
       id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        article_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "article", key: "id"},
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        },
        url: {
            type: Sequelize.STRING(250),
            allowNull: false,
        },
        alt_text: {
            type: Sequelize.STRING(300),
            allowNull: false,
        },
        sort_order: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        created_at: { type: Sequelize.DATE },
        updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('article_images');
  }
};
