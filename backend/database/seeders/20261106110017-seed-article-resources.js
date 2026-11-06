'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("article_resources", [
      { article_id: 1, resource_id: 1 },
      { article_id: 1, resource_id: 2 },
      { article_id: 1, resource_id: 3 },
      { article_id: 2, resource_id: 6 },
      { article_id: 3, resource_id: 5 },
      { article_id: 4, resource_id: 3 },
      { article_id: 8, resource_id: 6 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("article_resources", { article_id: [1, 2, 3, 4, 8] });
  },
};
