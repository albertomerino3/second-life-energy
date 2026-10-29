'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert( 'kit_components', [{
        id: 1,
        kit_id: 1,
        component_id: 2,
        quantity: 3,
        created_at: now,
        updated_at: now
    }], {});
    
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
        pg_get_serial_sequence('public.kit_components', 'id'),
        COALESCE((SELECT MAX(id) FROM public.kit_components), 0) + 1,
        false
        );
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( 'kit_components', { id: [1] });
  }
};
