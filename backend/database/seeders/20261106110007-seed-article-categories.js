'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Parents first, then subcategories (self reference)
    await queryInterface.bulkInsert("article_categories", [
      { id: 1, name: "Kits", description: "Kits didácticos montados con material recuperado", parent_category_id: null },
      { id: 2, name: "Componentes", description: "Componentes electrónicos recuperados y revisados", parent_category_id: null },
    ]);

    await queryInterface.bulkInsert("article_categories", [
      { id: 3, name: "Kits de electrónica básica", description: "Primeros montajes: LEDs, resistencias y circuitos sencillos", parent_category_id: 1 },
      { id: 4, name: "Kits de energía renovable", description: "Montajes con paneles solares y almacenamiento de energía", parent_category_id: 1 },
      { id: 5, name: "Componentes discretos", description: "Resistencias, condensadores, diodos y LEDs", parent_category_id: 2 },
      { id: 6, name: "Microcontroladores y sensores", description: "Placas Arduino recuperadas y sensores", parent_category_id: 2 },
      { id: 7, name: "Alimentación y energía", description: "Paneles, módulos de carga y baterías", parent_category_id: 2 },
    ]);

    await resetSequence(queryInterface, "article_categories");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_categories", { id: [3, 4, 5, 6, 7] });
    await queryInterface.bulkDelete("article_categories", { id: [1, 2] });
  },
};
