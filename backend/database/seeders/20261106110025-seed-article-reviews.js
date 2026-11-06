'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("article_reviews", [
      { id: 1, article_id: 1, reviewer_id: 2, decision: "approved", comments: "Kit completo y bien documentado.", created_at: now },
      { id: 2, article_id: 2, reviewer_id: 1, decision: "approved", comments: null, created_at: now },
      { id: 3, article_id: 3, reviewer_id: 3, decision: "returned", comments: "Falta la lista de componentes y alguna foto del montaje.", created_at: now },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.article_reviews', 'id'),
          COALESCE((SELECT MAX(id) FROM public.article_reviews), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_reviews", { id: [1, 2, 3] });
  },
};
