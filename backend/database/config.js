const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");

function getConfig(environment) {
  let variables = {};

  if (environment === "production") {
    variables = process.env;
  } else {
    const envPath = path.resolve(__dirname, "..", `.env.${environment}`);
    if (fs.existsSync(envPath)) {
      try {
        variables = dotenv.parse(fs.readFileSync(envPath)) || {};
      } catch {
        variables = {};
      }
    }
  }

  return {
    username: variables.DB_USER || "root",
    password: variables.DB_PASSWORD ?? "",
    database: variables.DB_NAME || "second_life_energy_dev",
    host: variables.DB_HOST || "localhost",
    port: Number(variables.DB_PORT ?? 3306),
    dialect: variables.DB_DIALECT || "mysql",
    logging: false,
    migrationStorage: "sequelize",
    seederStorage: "sequelize",
  };
}

module.exports = {
  development: getConfig("development"),
  test: getConfig("test"),
  production: getConfig("production"),
};
