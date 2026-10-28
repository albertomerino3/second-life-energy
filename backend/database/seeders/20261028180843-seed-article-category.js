'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert( 'article_category', [{
      id: 1,
      name: 'tecnology',
      description: 'Articles about technology, programming, and new digital trends',
      parentCategoryId: null,
      created_at: now,
      updated_at: now
    }], {});
    
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
        pg_get_serial_sequence('public.article_category', 'id'),
        COALESCE((SELECT MAX(id) FROM public.article_categorys), 0) + 1,
        false
        );
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( 'article_categorys', { id: [1, 2] });
  }
};
