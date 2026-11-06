'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("permissions", [
      { id: 1, code: "users.manage", description: "Gestionar usuarios y sus roles" },
      { id: 2, code: "invitations.teachers", description: "Invitar profesorado" },
      { id: 3, code: "invitations.students", description: "Invitar alumnado (permiso delegado)" },
      { id: 4, code: "articles.create", description: "Crear borradores de kits y componentes" },
      { id: 5, code: "articles.review", description: "Aprobar o devolver kits enviados a revisión" },
      { id: 6, code: "articles.publish", description: "Publicar kits y componentes en el catálogo" },
      { id: 7, code: "resources.manage_own", description: "Gestionar los recursos educativos propios" },
      { id: 8, code: "resources.manage_all", description: "Gestionar todos los recursos educativos" },
      { id: 9, code: "forum.write", description: "Publicar preguntas y respuestas en el foro" },
      { id: 10, code: "forum.moderate", description: "Ocultar o restaurar mensajes del foro" },
      { id: 11, code: "requests.manage", description: "Gestionar las solicitudes de material" },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.permissions', 'id'),
          COALESCE((SELECT MAX(id) FROM public.permissions), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] });
  },
};
