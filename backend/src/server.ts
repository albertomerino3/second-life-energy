import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { setupAssociations } from "./models/associations.js";

import "./modules/articles/article.model.js";
import "./modules/audit-logs/audit-log.model.js";
import "./modules/invitations/invitation.model.js";
import "./modules/resources/resource.model.js";
import "./modules/simulations/simulation.model.js";
import "./modules/users/user.model.js";

async function startServer() {
    try {

        setupAssociations();

        await sequelize.authenticate();
        console.log("MySQL connection established.");
        
        await sequelize.sync({ force: true }).then(() => {
            console.log("Database synchronized.");
        });

        app.listen(env.PORT, () => {
            console.log(
                `Server running at http://localhost:${env.PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Could not start the application:",
            error
        );
        process.exit(1);
    }
}

startServer();