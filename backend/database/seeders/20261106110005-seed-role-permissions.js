'use strict';

// Reparto según la matriz RBAC del README. Los permisos delegados (**) no van en el rol por defecto.
const TEACHER = [
  "articles:read", "articles:create", "articles:update",
  "article-categories:read",
  "article-images:read", "article-images:create", "article-images:update", "article-images:delete",
  "kit-components:read", "kit-components:create", "kit-components:update", "kit-components:delete",
  "article-resources:read", "article-resources:create", "article-resources:delete",
  "article-reviews:read", "article-reviews:create", "article-reviews:update",
  "stock-movements:read",
  "resources:read", "resources:create", "resources:update", "resources:delete",
  "tags:read", "resource-tags:read", "resource-tags:create", "resource-tags:delete",
  "forum-categories:read", "questions:read", "questions:create", "questions:update",
  "answers:read", "answers:create", "answers:update",
  "simulations:read", "simulation-articles:read", "simulation-resources:read",
];

const STUDENT = [
  "articles:read", "article-categories:read", "article-images:read", "kit-components:read", "article-resources:read",
  "resources:read", "tags:read", "resource-tags:read",
  "forum-categories:read", "questions:read", "questions:create", "questions:update",
  "answers:read", "answers:create", "answers:update",
  "simulations:read", "simulation-articles:read", "simulation-resources:read",
];

module.exports = {
  async up(queryInterface) {
    const [permissions] = await queryInterface.sequelize.query("SELECT id, code FROM permissions");
    const idByCode = new Map(permissions.map((permission) => [permission.code, permission.id]));
    const ids = (codes) => codes.map((code) => {
      if (!idByCode.has(code)) throw new Error(`Unknown permission code: ${code}`);
      return idByCode.get(code);
    });

    const rolePermissions = {
      1: permissions.map((permission) => permission.id), // admin: todos
      2: ids(TEACHER),
      3: ids(STUDENT),
    };

    const rows = Object.entries(rolePermissions).flatMap(([roleId, permissionIds]) =>
      permissionIds.map((permissionId) => ({ role_id: Number(roleId), permission_id: permissionId }))
    );
    await queryInterface.bulkInsert("role_permissions", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("role_permissions", { role_id: [1, 2, 3] });
  },
};
