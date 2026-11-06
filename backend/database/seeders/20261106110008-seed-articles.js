'use strict';

const { resetSequence } = require("../utils/reset-sequence");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const base = { created_at: now, updated_at: now };

    await queryInterface.bulkInsert("articles", [
      // Kits
      { id: 1, category_id: 3, created_by_id: 2, name: "Kit de iniciación a la electrónica", description: "Kit para aprender a montar circuitos sencillos con LEDs y resistencias recuperadas.", type: "kit", specifications: "Alimentación 9 V. Incluye protoboard, LEDs, resistencias y condensadores.", stock: 4, status: "published", ...base },
      // Out of stock: visible in the catalogue but not requestable (HU-03)
      { id: 2, category_id: 4, created_by_id: 2, name: "Kit cargador solar USB", description: "Kit para montar un cargador USB con un panel solar y un módulo TP4056 recuperados.", type: "kit", specifications: "Panel 6 V 1 W. Salida USB 5 V 500 mA.", stock: 0, status: "published", ...base },
      // Created by a student and returned by the reviewer (HU-11)
      { id: 3, category_id: 3, created_by_id: 4, name: "Kit semáforo con Arduino", description: "Semáforo de tres luces programado con una placa Arduino Uno recuperada.", type: "kit", specifications: "Arduino Uno, 3 LEDs, 3 resistencias de 220 Ω.", stock: 2, status: "returned", ...base },
      // Components
      { id: 4, category_id: 5, created_by_id: 3, name: "Pack de resistencias variadas", description: "Pack de 20 resistencias de valores habituales extraídas de placas en desuso.", type: "component", specifications: "1/4 W, tolerancia 5 %. Valores de 220 Ω a 10 kΩ.", stock: 50, status: "published", ...base },
      { id: 5, category_id: 5, created_by_id: 3, name: "Condensadores electrolíticos", description: "Condensadores electrolíticos revisados con el capacímetro.", type: "component", specifications: "Valores de 10 µF a 470 µF, hasta 25 V.", stock: 30, status: "published", ...base },
      { id: 6, category_id: 6, created_by_id: 2, name: "Placa Arduino Uno recuperada", description: "Placa Arduino Uno revisada y con el bootloader reinstalado.", type: "component", specifications: "ATmega328P, 14 E/S digitales, 6 entradas analógicas.", stock: 6, status: "published", ...base },
      // Out of stock component
      { id: 7, category_id: 7, created_by_id: 3, name: "Panel solar 6 V recuperado", description: "Panel solar de pequeño tamaño procedente de lámparas de jardín.", type: "component", specifications: "6 V, 1 W, 110 x 60 mm.", stock: 0, status: "published", ...base },
      { id: 8, category_id: 7, created_by_id: 3, name: "Módulo cargador TP4056", description: "Módulo de carga para baterías de litio de una celda.", type: "component", specifications: "Entrada 5 V, corriente de carga 1 A, protección de descarga.", stock: 12, status: "published", ...base },
      { id: 9, category_id: 5, created_by_id: 2, name: "LEDs de 5 mm surtidos", description: "LEDs de colores recuperados de equipos de señalización.", type: "component", specifications: "Rojo, verde, amarillo y azul. 20 mA.", stock: 100, status: "published", ...base },
      // Draft created by a student, not visible in the public catalogue yet
      { id: 10, category_id: 6, created_by_id: 4, name: "Sensor ultrasónico HC-SR04", description: "Sensor de distancia por ultrasonidos.", type: "component", specifications: "Rango de 2 cm a 400 cm.", stock: 3, status: "draft", ...base },
    ]);

    await resetSequence(queryInterface, "articles");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("articles", { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
  },
};
