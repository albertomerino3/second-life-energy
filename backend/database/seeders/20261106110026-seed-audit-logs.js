'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("audit_logs", [
      { id: 1, user_id: 1, entity: "UserRole", entity_id: 3, action: "permission_change", previous_values: null, new_values: JSON.stringify({ userId: 3, roleId: 2 }), created_at: now },
      { id: 2, user_id: 2, entity: "Article", entity_id: 1, action: "publish", previous_values: JSON.stringify({ status: "in_review" }), new_values: JSON.stringify({ status: "published" }), created_at: now },
      { id: 3, user_id: 3, entity: "Article", entity_id: 3, action: "update", previous_values: JSON.stringify({ status: "in_review" }), new_values: JSON.stringify({ status: "returned" }), created_at: now },
      { id: 4, user_id: null, entity: "Request", entity_id: 1, action: "create", previous_values: null, new_values: JSON.stringify({ reference: "DEMO-2026-0001", status: "confirmed" }), created_at: now },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.audit_logs', 'id'),
          COALESCE((SELECT MAX(id) FROM public.audit_logs), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("audit_logs", { id: [1, 2, 3, 4] });
  },
};
