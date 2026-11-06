'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("user_roles", [
      { user_id: 1, role_id: 1, assigned_at: now },
      { user_id: 2, role_id: 2, assigned_at: now },
      { user_id: 3, role_id: 2, assigned_at: now },
      { user_id: 4, role_id: 3, assigned_at: now },
      { user_id: 5, role_id: 3, assigned_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("user_roles", { user_id: [1, 2, 3, 4, 5] });
  },
};
