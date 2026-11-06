'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("roles", [
      { id: 1, name: "admin", description: "Administración: gestión global de usuarios, solicitudes y contenidos" },
      { id: 2, name: "teacher", description: "Docente invitado: gestiona sus recursos, revisa kits e invita alumnado si tiene permiso delegado" },
      { id: 3, name: "student", description: "Alumnado autorizado: crea borradores de kits y participa en el foro" },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.roles', 'id'),
          COALESCE((SELECT MAX(id) FROM public.roles), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", { id: [1, 2, 3] });
  },
};
