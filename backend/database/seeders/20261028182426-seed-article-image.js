'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert( 'article_images', [{
        id: 1,
        articleId: 1,
        url: 'https://example.com/images/tecnology.jpg',
        altText: 'Illustrative image about technology and programming',
        sortOrder: 1,
        created_at: now,
        updated_at: now
    }], {});
    
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
        pg_get_serial_sequence('public.article_images', 'id'),
        COALESCE((SELECT MAX(id) FROM public.article_images), 0) + 1,
        false
        );
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( 'article_images', { id: [1] });
  }
};
