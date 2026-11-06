'use strict';

const ROLE_PERMISSIONS = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  2: [3, 4, 5, 6, 7, 9, 10],
  3: [4, 9],
};

module.exports = {
  async up(queryInterface) {
    const rows = Object.entries(ROLE_PERMISSIONS).flatMap(([roleId, permissionIds]) =>
      permissionIds.map((permissionId) => ({
        role_id: Number(roleId),
        permission_id: permissionId,
      }))
    );

    await queryInterface.bulkInsert("role_permissions", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("role_permissions", { role_id: [1, 2, 3] });
  },
};
