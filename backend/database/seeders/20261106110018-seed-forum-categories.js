'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("forum_categories", [
      { id: 1, name: "Dudas generales", description: "Preguntas sobre el proyecto y la plataforma" },
      { id: 2, name: "Soldadura y montaje", description: "Técnicas para soldar y montar los kits" },
      { id: 3, name: "Arduino y programación", description: "Programación de placas recuperadas" },
      { id: 4, name: "Energía renovable", description: "Paneles solares, baterías y almacenamiento" },
    ]);

    await resetSequence(queryInterface, "forum_categories");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("forum_categories", { id: [1, 2, 3, 4] });
  },
};
