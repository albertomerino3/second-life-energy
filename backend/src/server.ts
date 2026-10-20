import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { defineAssociations, defineDetails, defineCustomer, defineOrder } from "./models/associations.js";

import "./modules/users/user.model.js";
import "./modules/resources/resource.model.js";
import "./modules/articles/article.model.js";

async function startServer() {
    try {

        defineAssociations();
        defineDetails();
        defineCustomer();
        defineOrder();

        await sequelize.authenticate();
        console.log("MySQL connection established.");
        
        await sequelize.sync({ force: true });
        console.log("Models synchronized.");

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