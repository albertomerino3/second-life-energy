'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("resource_tags", [
      { resource_id: 1, tag_id: 4 },
      { resource_id: 1, tag_id: 7 },
      { resource_id: 2, tag_id: 8 },
      { resource_id: 3, tag_id: 8 },
      { resource_id: 4, tag_id: 6 },
      { resource_id: 4, tag_id: 3 },
      { resource_id: 6, tag_id: 1 },
      { resource_id: 6, tag_id: 7 },
      { resource_id: 6, tag_id: 3 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("resource_tags", { resource_id: [1, 2, 3, 4, 6] });
  },
};
