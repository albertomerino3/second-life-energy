'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resource_tags', {
      resource_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'resources',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tag_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('resource_tags');
  }
};