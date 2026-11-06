import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { setupAssociations } from "./models/associations.js";

async function startServer() {
    try {
        setupAssociations();

        await sequelize.authenticate();
        console.log(`Database connection established (${env.DB_DIALECT}://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}).`);

        app.listen(env.PORT, () => {
            console.log(`Server running at http://localhost:${env.PORT} (${env.NODE_ENV})`);
        });
    } catch (error) {
        console.error("Could not start the application:", error);
        process.exit(1);
    }
}

startServer();
