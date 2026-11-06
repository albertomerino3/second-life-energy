'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("forum_categories", [
      { id: 1, name: "Dudas generales", description: "Preguntas sobre el proyecto y la plataforma" },
      { id: 2, name: "Soldadura y montaje", description: "Técnicas para soldar y montar los kits" },
      { id: 3, name: "Arduino y programación", description: "Programación de placas recuperadas" },
      { id: 4, name: "Energía renovable", description: "Paneles solares, baterías y almacenamiento" },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.forum_categories', 'id'),
          COALESCE((SELECT MAX(id) FROM public.forum_categories), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("forum_categories", { id: [1, 2, 3, 4] });
  },
};
