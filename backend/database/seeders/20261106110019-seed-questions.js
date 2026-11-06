'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // accepted_answer_id is filled in the answers seeder, once the answers exist
    await queryInterface.bulkInsert("questions", [
      { id: 1, category_id: 2, author_id: 4, accepted_answer_id: null, title: "¿Qué temperatura uso para soldar componentes recuperados?", content: "Tengo un soldador regulable y no sé qué temperatura usar para no dañar los componentes.", status: "solved", created_at: now },
      { id: 2, category_id: 3, author_id: 4, accepted_answer_id: null, title: "El semáforo con Arduino no enciende el LED verde", content: "He montado el kit semáforo y el LED verde nunca se enciende. El rojo y el amarillo funcionan.", status: "open", created_at: now },
      { id: 3, category_id: 4, author_id: 5, accepted_answer_id: null, title: "¿Se puede cargar un móvil con el kit solar?", content: "Quiero saber si el kit cargador solar da suficiente corriente para un móvil.", status: "open", created_at: now },
      // Hidden by a moderator (see moderations seeder)
      { id: 4, category_id: 1, author_id: 4, accepted_answer_id: null, title: "Mensaje fuera de tema", content: "Mensaje que no tiene relación con el proyecto.", status: "hidden", created_at: now },
    ]);

    await resetSequence(queryInterface, "questions");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("questions", { id: [1, 2, 3, 4] });
  },
};
