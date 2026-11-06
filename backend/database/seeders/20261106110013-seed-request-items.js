'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("request_items", [
      { id: 1, request_id: 1, article_id: 1, quantity: 1 },
      { id: 2, request_id: 1, article_id: 9, quantity: 10 },
      { id: 3, request_id: 2, article_id: 4, quantity: 2 },
      { id: 4, request_id: 2, article_id: 6, quantity: 1 },
    ]);

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

  async down(queryInterface) {
    await queryInterface.bulkDelete("request_items", { id: [1, 2, 3, 4] });
  },
};
