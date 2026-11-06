'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("simulation_resources", [
      { simulation_id: 1, resource_id: 5 },
      { simulation_id: 2, resource_id: 4 },
      { simulation_id: 3, resource_id: 3 },
      { simulation_id: 3, resource_id: 5 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("simulation_resources", { simulation_id: [1, 2, 3] });
  },
};
