'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert( 'article_reviews', [{
        id: 1,
        article_id: 1,
        reviewer_id: 2,
        decision: 'approved',
        comments: 'The article is well-written, informative, and ready for publication',
        created_at: now,
        updated_at: now
    }], {});
    
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( 'article_reviews', { id: [1] });
  }
};
