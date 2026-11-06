'use strict';

const crypto = require("node:crypto");
const { resetSequence } = require("../utils/reset-sequence");

const DAY = 24 * 60 * 60 * 1000;

// Only the hash of the token is stored, never the token itself
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = Date.now();

    await queryInterface.bulkInsert("invitations", [
      // Accepted invitation: admin invited a teacher
      {
        id: 1,
        invited_by_id: 1,
        role_id: 2,
        email: "marcos.diaz@second-life-energy.test",
        token_hash: hashToken("demo-invitation-1"),
        expires_at: new Date(now - 20 * DAY),
        used_at: new Date(now - 25 * DAY),
        created_at: new Date(now - 27 * DAY),
      },
      // Accepted invitation: teacher (delegated permission) invited a student
      {
        id: 2,
        invited_by_id: 2,
        role_id: 3,
        email: "ana.rodriguez@second-life-energy.test",
        token_hash: hashToken("demo-invitation-2"),
        expires_at: new Date(now - 10 * DAY),
        used_at: new Date(now - 15 * DAY),
        created_at: new Date(now - 17 * DAY),
      },
      // Pending invitation, still valid
      {
        id: 3,
        invited_by_id: 2,
        role_id: 3,
        email: "nuevo.alumno@second-life-energy.test",
        token_hash: hashToken("demo-invitation-3"),
        expires_at: new Date(now + 7 * DAY),
        used_at: null,
        created_at: new Date(now),
      },
      // Expired invitation, never used
      {
        id: 4,
        invited_by_id: 1,
        role_id: 2,
        email: "docente.caducada@second-life-energy.test",
        token_hash: hashToken("demo-invitation-4"),
        expires_at: new Date(now - 1 * DAY),
        used_at: null,
        created_at: new Date(now - 8 * DAY),
      },
    ]);

    await resetSequence(queryInterface, "invitations");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("invitations", { id: [1, 2, 3, 4] });
  },
};
