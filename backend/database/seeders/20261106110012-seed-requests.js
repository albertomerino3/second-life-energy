'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("requests", [
      { id: 1, reference: "DEMO-2026-0001", contact_name: "Visitante de prueba", contact_email: "visitante@example.com", notes: "Material para un taller de reutilización en el aula.", status: "confirmed", created_at: now },
      { id: 2, reference: "DEMO-2026-0002", contact_name: "Centro educativo de prueba", contact_email: "centro@example.com", notes: null, status: "draft", created_at: now },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.requests', 'id'),
          COALESCE((SELECT MAX(id) FROM public.requests), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("requests", { id: [1, 2] });
  },
};
