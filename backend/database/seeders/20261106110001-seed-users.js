'use strict';

const { resetSequence } = require("../utils/reset-sequence");

// bcrypt hash of the demo password "Demo1234!" (only for local development)
const DEMO_PASSWORD_HASH = "$2a$10$hYvgPCvMCddgj6p/.Efuwu7B73KqSjE8OFyPiqcJhO/fS8wDtKp8G";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("users", [
      { id: 1, name: "Administración Second Life", email: "admin@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      { id: 2, name: "Laura Pérez (docente)", email: "laura.perez@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      { id: 3, name: "Marcos Díaz (docente)", email: "marcos.diaz@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      { id: 4, name: "Ana Rodríguez (alumna)", email: "ana.rodriguez@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: true, created_at: now, updated_at: now },
      // Inactive account: invited student that no longer has access
      { id: 5, name: "Pablo Hernández (alumno)", email: "pablo.hernandez@second-life-energy.test", password_hash: DEMO_PASSWORD_HASH, is_active: false, created_at: now, updated_at: now },
    ]);

    await resetSequence(queryInterface, "users");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", { id: [1, 2, 3, 4, 5] });
  },
};
