'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("simulations", [
      { id: 1, title: "Carga y descarga de un condensador", description: "Circuito RC para observar cómo se carga y descarga un condensador.", platform: "falstad", url: "https://www.falstad.com/circuit/circuitjs.html", objectives: "Comprender la constante de tiempo de un circuito RC.", materials: "Condensador electrolítico, resistencias y LED del kit de iniciación." },
      { id: 2, title: "Semáforo con Arduino Uno", description: "Programación de un semáforo de tres luces.", platform: "wokwi", url: "https://wokwi.com/projects/new/arduino-uno", objectives: "Programar salidas digitales y temporizaciones con Arduino.", materials: "Placa Arduino Uno, 3 LEDs y 3 resistencias de 220 Ω." },
      { id: 3, title: "Divisor de tensión", description: "Cálculo y comprobación de un divisor de tensión con dos resistencias.", platform: "falstad", url: "https://www.falstad.com/circuit/circuitjs.html", objectives: "Aplicar la ley de Ohm para obtener una tensión de salida.", materials: "Pack de resistencias variadas." },
    ]);

    await resetSequence(queryInterface, "simulations");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("simulations", { id: [1, 2, 3] });
  },
};
