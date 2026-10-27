'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("articleResource", {
      articleId: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
      },
      resourceId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
      },
      created_at: { type: Sequelize.DATE },
      updated_at : { type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('articleResource');
  }
};
