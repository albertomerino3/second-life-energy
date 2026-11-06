'use strict';

module.exports = {
  async up(queryInterface) {
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

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.article_categories', 'id'),
          COALESCE((SELECT MAX(id) FROM public.article_categories), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_categories", { id: [3, 4, 5, 6, 7] });
    await queryInterface.bulkDelete("article_categories", { id: [1, 2] });
  },
};
