'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('resources', [{
      id: 1,
      author_id: 1,
      title: "PHP extra lessons",
      description: "PHP lessons for begginers",
      type: "Education",
      topic: "PHP",
      difficulty: "Medium",
      url: "https://youtube.com/PHPlessons",
      status: "Active",
      published_at: now,
      created_at: now,
    }], {});
     
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.resources', 'id'),
          COALESCE((SELECT MAX(id) FROM public.resources), 0) + 1,
          false
        );
      `)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resources', { id: [1] });
  }
};