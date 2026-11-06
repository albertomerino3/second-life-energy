'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("stock_movements", [
      { id: 1, article_id: 1, user_id: 2, type: "in", quantity: 5, reason: "Kits montados con material donado por el IES La Guancha", created_at: now },
      { id: 2, article_id: 1, user_id: 2, type: "out", quantity: 1, reason: "Préstamo para un taller de 1.º ESO", created_at: now },
      { id: 3, article_id: 2, user_id: 2, type: "out", quantity: 2, reason: "Kits entregados en la jornada de puertas abiertas", created_at: now },
      { id: 4, article_id: 7, user_id: 3, type: "adjustment", quantity: 1, reason: "Panel dañado detectado en la revisión", created_at: now },
      { id: 5, article_id: 9, user_id: 3, type: "in", quantity: 100, reason: "LEDs recuperados de paneles de señalización", created_at: now },
    ]);

    await resetSequence(queryInterface, "stock_movements");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("stock_movements", { id: [1, 2, 3, 4, 5] });
  },
};
