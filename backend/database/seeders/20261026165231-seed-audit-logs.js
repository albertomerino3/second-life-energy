'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('audit_logs', [{
      id: 1,
      user_id: 1,
      entity: "Article",
      entity_id: 1,
      action: "CREATE",
      previous_values: null,
      new_values: JSON.stringify({ name: "Laptop", stock: 10 }),
      created_at: now
    }], {});

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.audit_logs', 'id'),
          COALESCE((SELECT MAX(id) FROM public.audit_logs), 0) + 1,
          false
        );
      `)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('audit_logs', { id: [1] });
  }
};