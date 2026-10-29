'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert( 'article_resources', [{
        article_id: 1,
        resource_id: 1,
        created_at: now,
        updated_at: now
    }], {});
    
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
        pg_get_serial_sequence('public.article_resources', 'id'),
        COALESCE((SELECT MAX(id) FROM public.article_resources), 0) + 1,
        false
        );
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( 'article_resources', { id: [1] });
  }
};
