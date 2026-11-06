'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("answers", [
      { id: 1, question_id: 1, author_id: 2, content: "Entre 320 y 350 ºC es suficiente. Aplica el calor el menor tiempo posible.", status: "published", created_at: now },
      { id: 2, question_id: 1, author_id: 4, content: "Yo uso 330 ºC y estaño con flux y me funciona bien.", status: "published", created_at: now },
      { id: 3, question_id: 2, author_id: 3, content: "Revisa la polaridad del LED y que la resistencia esté en el pin correcto.", status: "published", created_at: now },
      { id: 4, question_id: 2, author_id: 5, content: "Respuesta con lenguaje inapropiado.", status: "hidden", created_at: now },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.answers', 'id'),
          COALESCE((SELECT MAX(id) FROM public.answers), 0) + 1,
          false
        );
      `);
    }

    await queryInterface.bulkUpdate("questions", { accepted_answer_id: 1 }, { id: 1 });
  },

  async down(queryInterface) {
    await queryInterface.bulkUpdate("questions", { accepted_answer_id: null }, { id: 1 });
    await queryInterface.bulkDelete("answers", { id: [1, 2, 3, 4] });
  },
};
