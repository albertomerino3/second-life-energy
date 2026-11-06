'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("article_images", [
      { id: 1, article_id: 1, url: "/images/articles/kit-iniciacion-electronica-1.jpg", alt_text: "Kit de iniciación con protoboard, LEDs y resistencias", sort_order: 0 },
      { id: 2, article_id: 1, url: "/images/articles/kit-iniciacion-electronica-2.jpg", alt_text: "Circuito de LED montado sobre la protoboard", sort_order: 1 },
      { id: 3, article_id: 2, url: "/images/articles/kit-cargador-solar-1.jpg", alt_text: "Panel solar conectado a un módulo de carga USB", sort_order: 0 },
      { id: 4, article_id: 3, url: "/images/articles/kit-semaforo-arduino-1.jpg", alt_text: "Semáforo de tres LEDs controlado por Arduino", sort_order: 0 },
      { id: 5, article_id: 6, url: "/images/articles/arduino-uno-1.jpg", alt_text: "Placa Arduino Uno recuperada vista desde arriba", sort_order: 0 },
      { id: 6, article_id: 7, url: "/images/articles/panel-solar-6v-1.jpg", alt_text: "Panel solar pequeño de 6 voltios", sort_order: 0 },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.article_images', 'id'),
          COALESCE((SELECT MAX(id) FROM public.article_images), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_images", { id: [1, 2, 3, 4, 5, 6] });
  },
};
