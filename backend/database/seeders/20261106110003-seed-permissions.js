'use strict';

// Un permiso por cada authorize("entidad:acción") que usan las rutas (mismo patrón que "bicycles:read" en bicycle-shop).
const CRUD = ["read", "create", "update", "delete"];
const LINK = ["read", "create", "delete"]; // tablas intermedias sin update

const ENTITY_ACTIONS = {
  "users": CRUD,
  "roles": CRUD,
  "permissions": CRUD,
  "user-roles": CRUD,
  "role-permissions": LINK,
  "invitations": CRUD,
  "article-categories": CRUD,
  "articles": CRUD,
  "kit-components": CRUD,
  "article-images": CRUD,
  "stock-movements": CRUD,
  "requests": CRUD,
  "request-items": CRUD,
  "resources": CRUD,
  "tags": CRUD,
  "resource-tags": LINK,
  "article-resources": LINK,
  "forum-categories": CRUD,
  "questions": CRUD,
  "answers": CRUD,
  "moderations": CRUD,
  "simulations": CRUD,
  "simulation-articles": LINK,
  "simulation-resources": LINK,
  "article-reviews": CRUD,
  "audit-logs": CRUD,
};

module.exports = {
  async up(queryInterface) {
    const permissions = Object.entries(ENTITY_ACTIONS).flatMap(([entity, actions]) =>
      actions.map((action) => ({ code: `${entity}:${action}`, description: `${action} ${entity}` }))
    );

    await queryInterface.bulkInsert("permissions", permissions.map((permission, index) => ({ id: index + 1, ...permission })));

    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.permissions', 'id'),
          COALESCE((SELECT MAX(id) FROM public.permissions), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
