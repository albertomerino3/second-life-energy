'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: "Pepe",
      email: "pepe@gmail.com",
      password_hash: "kjsdhdfkghFIHWDFsfdsafwe",
      is_active: true,
      created_at: now,
      updated_at: now
    }], {});

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.users', 'id'),
          COALESCE((SELECT MAX(id) FROM public.users), 0) + 1,
          false
        );
      `)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { id: [1] });
  }
};