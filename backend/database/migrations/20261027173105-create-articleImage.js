'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("articleImage", {
       id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        article_Id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: "article", key: "id"},
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        },
        url: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        altText: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        sortOrder: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        created_at: { type: Sequelize.DATE },
        updated_at: { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('articleImage');
  }
};
