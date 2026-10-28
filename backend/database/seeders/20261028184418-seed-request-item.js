'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert( 'request_items', [{
        id: 1,
        request_id: 1,
        article_id: 2,
        quantity: 3,
        created_at: now,
        updated_at: now
    }], {});
    
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
        pg_get_serial_sequence('public.request_items', 'id'),
        COALESCE((SELECT MAX(id) FROM public.request_items), 0) + 1,
        false
        );
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( 'request_items', { id: [1] });
  }
};
