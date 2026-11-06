'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { 
        id: 1,
        name: 'admin',
        description: 'Administrador del sistema'
      },
      { 
        id: 2,
        name: 'user',
        description: 'Usuario normal'
      },
      { 
        id: 3,
        name: 'moderator',
        description: 'Moderador de contenido'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};