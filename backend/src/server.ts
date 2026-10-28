import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { setupAssociations } from "./models/associations.js";

import "./modules/answers/answer.model.js";
import "./modules/article-categories/article-category.model.js";
import "./modules/article-images/article-image.model.js";
import "./modules/article-resources/article-resource.model.js";
import "./modules/article-reviews/article-review.model.js";
import "./modules/articles/article.model.js";
import "./modules/audit-logs/audit-log.model.js";
import "./modules/forum-categories/forum-category.model.js";
import "./modules/invitations/invitation.model.js";
import "./modules/kit-components/kit-component.model.js";
import "./modules/moderations/moderation.model.js";
import "./modules/permissions/permission.model.js";
import "./modules/questions/question.model.js";
import "./modules/request-items/request-item.model.js";
import "./modules/resources/resource.model.js";
import "./modules/role-permissions/role-permission.model.js";
import "./modules/simulations/simulation.model.js";
import "./modules/users/user.model.js";
import "./modules/tags/tag.model.js"
import "./modules/resource-tags/resource-tags.model.js"

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