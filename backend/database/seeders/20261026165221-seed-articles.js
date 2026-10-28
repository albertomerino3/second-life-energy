'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('articles', [{
      id: 1,
      category_id: 1,
      created_by_id: 1,
      name: "Laptop",
      description: "AMD White Laptop",
      type: "Electronic",
      specifications: "SSD 1T",
      stock: 10,
      status: "New",
      created_at: now,
      updated_at: now
    }], {});
     
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.articles', 'id'),
          COALESCE((SELECT MAX(id) FROM public.articles), 0) + 1,
          false
        );
      `)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', { id: [1] });
  }
};