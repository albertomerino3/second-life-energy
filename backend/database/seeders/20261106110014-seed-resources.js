'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("resources", [
      { id: 1, author_id: 2, title: "Guía de soldadura segura (PDF de demostración)", description: "Pasos básicos y medidas de seguridad para soldar componentes recuperados.", type: "pdf", topic: "Soldadura", difficulty: "beginner", url: "https://second-life-energy.test/recursos/demo/guia-soldadura.pdf", status: "published", published_at: now, created_at: now },
      { id: 2, author_id: 2, title: "Cómo medir con el polímetro", description: "Vídeo explicativo para medir tensión, corriente y continuidad.", type: "video", topic: "Medición", difficulty: "beginner", url: "https://www.youtube.com/results?search_query=como+usar+polimetro", status: "published", published_at: now, created_at: now },
      { id: 3, author_id: 3, title: "Ejercicios de la ley de Ohm", description: "Ejercicios resueltos para calcular resistencias limitadoras de LEDs.", type: "exercise", topic: "Electrónica básica", difficulty: "intermediate", url: "https://second-life-energy.test/recursos/ejercicios-ley-de-ohm", status: "published", published_at: now, created_at: now },
      { id: 4, author_id: 3, title: "Cuestionario: identificar componentes recuperados", description: "Cuestionario de autoevaluación sobre componentes electrónicos.", type: "quiz", topic: "Componentes", difficulty: "intermediate", url: "https://second-life-energy.test/recursos/cuestionario-componentes", status: "published", published_at: now, created_at: now },
      { id: 5, author_id: 2, title: "Simulador de circuitos Falstad", description: "Enlace externo al simulador CircuitJS1 para practicar sin material.", type: "link", topic: "Simulación", difficulty: "beginner", url: "https://www.falstad.com/circuit/circuitjs.html", status: "published", published_at: now, created_at: now },
      { id: 6, author_id: 3, title: "Carga de baterías de litio con TP4056", description: "Borrador de la guía para cargar baterías de litio de forma segura.", type: "pdf", topic: "Energía", difficulty: "advanced", url: "https://second-life-energy.test/recursos/demo/carga-baterias-litio.pdf", status: "draft", published_at: null, created_at: now },
    ]);

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.resources', 'id'),
          COALESCE((SELECT MAX(id) FROM public.resources), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("resources", { id: [1, 2, 3, 4, 5, 6] });
  },
};
