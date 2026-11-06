'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("moderations", [
      { id: 1, moderator_id: 2, question_id: 4, answer_id: null, action: "hide", reason: "Contenido no relacionado con el foro", created_at: now },
      { id: 2, moderator_id: 3, question_id: null, answer_id: 4, action: "hide", reason: "Lenguaje inapropiado", created_at: now },
      { id: 3, moderator_id: 2, question_id: null, answer_id: 2, action: "hide", reason: "Revisión de un dato que parecía incorrecto", created_at: now },
      { id: 4, moderator_id: 2, question_id: null, answer_id: 2, action: "restore", reason: "Dato verificado, la respuesta es correcta", created_at: now },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.moderations', 'id'),
          COALESCE((SELECT MAX(id) FROM public.moderations), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("moderations", { id: [1, 2, 3, 4] });
  },
};
