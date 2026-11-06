'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("kit_components", [
      // Kit de iniciación a la electrónica
      { kit_id: 1, component_id: 4, quantity: 1 },
      { kit_id: 1, component_id: 5, quantity: 2 },
      { kit_id: 1, component_id: 9, quantity: 5 },
      // Kit cargador solar USB
      { kit_id: 2, component_id: 7, quantity: 1 },
      { kit_id: 2, component_id: 8, quantity: 1 },
      // Kit semáforo con Arduino
      { kit_id: 3, component_id: 6, quantity: 1 },
      { kit_id: 3, component_id: 9, quantity: 3 },
      { kit_id: 3, component_id: 4, quantity: 1 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("kit_components", { kit_id: [1, 2, 3] });
  },
};
