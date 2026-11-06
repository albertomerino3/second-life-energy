'use strict';

const DEMO_PASSWORD_HASH = "$2a$10$hYvgPCvMCddgj6p/.Efuwu7B73KqSjE8OFyPiqcJhO/fS8wDtKp8G";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("users", [
      { id: 1, name: "Administración Second Life", email: "admin@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      { id: 2, name: "Laura Pérez (docente)", email: "laura.perez@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      { id: 3, name: "Marcos Díaz (docente)", email: "marcos.diaz@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      { id: 4, name: "Ana Rodríguez (alumna)", email: "ana.rodriguez@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      { id: 5, name: "Pablo Hernández (alumno)", email: "pablo.hernandez@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: false, created_at: now, updated_at: now },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.users', 'id'),
          COALESCE((SELECT MAX(id) FROM public.users), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", { id: [1, 2, 3, 4, 5] });
  },
};
