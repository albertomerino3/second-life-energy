'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('simulations', [{
      id: 1,
      title: "Simulation Test",
      description: "Test for simulations",
      platform: "Youtube",
      url: "https://youtube.com/SimulationTest",
      objectives: "Make simulations",
      materials: "Laptop, Internet"
    }], {});
     
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.simulations', 'id'),
          COALESCE((SELECT MAX(id) FROM public.simulations), 0) + 1,
          false
        );
      `)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('simulations', { id: [1] });
  }
};