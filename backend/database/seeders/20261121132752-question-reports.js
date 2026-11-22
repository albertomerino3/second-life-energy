
"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("question_reports", [
      {
        question_id: 1,
        reason: "La pregunta contiene información incorrecta",
        status: "pending",
        severity: 4,
        created_at: new Date(),
      },
      {
        question_id: 1,
        reason: "El contenido no es apropiado",
        status: "reviewed",
        severity: 2,
        created_at: new Date(),
      },
      {
        question_id: 2,
        reason: "La pregunta es engañosa",
        status: "pending",
        severity: 5,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("question_reports", null, {});
  },
};
