'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    await queryInterface.bulkInsert('invitations', [{
      id: 1,
      invited_by_id: 1,
      role_id: 1,
      email: "pepe@gmail.com",
      token_hash: "AMDHDBASDBSAhjsahdjUHE7685",
      expires_at: nextWeek,
      used_at: null,
      created_at: now,
    }], {});

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.invitations', 'id'),
          COALESCE((SELECT MAX(id) FROM public.invitations), 0) + 1,
          false
        );
      `)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invitations', { id: [1] });
  }
};