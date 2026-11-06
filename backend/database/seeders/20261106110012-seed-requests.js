'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Demo requests: the reference is clearly fictitious and nobody processes them (HU-05)
    await queryInterface.bulkInsert("requests", [
      { id: 1, reference: "DEMO-2026-0001", contact_name: "Visitante de prueba", contact_email: "visitante@example.com", notes: "Material para un taller de reutilización en el aula.", status: "confirmed", created_at: now },
      { id: 2, reference: "DEMO-2026-0002", contact_name: "Centro educativo de prueba", contact_email: "centro@example.com", notes: null, status: "draft", created_at: now },
    ]);

    await resetSequence(queryInterface, "requests");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("requests", { id: [1, 2] });
  },
};
