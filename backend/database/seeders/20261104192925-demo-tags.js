'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [
      { 
        id: 1,
        name: 'Energía Solar',
        slug: 'energia-solar'
      },
      { 
        id: 2,
        name: 'Energía Eólica',
        slug: 'energia-eolica'
      },
      { 
        id: 3,
        name: 'Sostenibilidad',
        slug: 'sostenibilidad'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};