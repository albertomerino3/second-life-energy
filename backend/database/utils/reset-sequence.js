'use strict';

/**
 * Seeders insert rows with explicit ids so that the relationships between
 * tables are predictable. PostgreSQL does not move the SERIAL sequence when
 * an id is given, so the next INSERT made by the API would fail with a
 * duplicated primary key. This helper moves the sequence after the last id.
 */
async function resetSequence(queryInterface, table, column = "id") {
  if (queryInterface.sequelize.getDialect() !== "postgres") {
    return;
  }

  await queryInterface.sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence('public.${table}', '${column}'),
      COALESCE((SELECT MAX(${column}) FROM public.${table}), 0) + 1,
      false
    );
  `);
}

module.exports = { resetSequence };
