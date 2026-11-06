'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("tags", [
      { id: 1, name: "Energía solar", slug: "energia-solar" },
      { id: 2, name: "Energía eólica", slug: "energia-eolica" },
      { id: 3, name: "Sostenibilidad", slug: "sostenibilidad" },
      { id: 4, name: "Soldadura", slug: "soldadura" },
      { id: 5, name: "Arduino", slug: "arduino" },
      { id: 6, name: "Reciclaje electrónico", slug: "reciclaje-electronico" },
      { id: 7, name: "Seguridad", slug: "seguridad" },
      { id: 8, name: "Medición", slug: "medicion" },
    ]);

    await resetSequence(queryInterface, "tags");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tags", { id: [1, 2, 3, 4, 5, 6, 7, 8] });
  },
};
