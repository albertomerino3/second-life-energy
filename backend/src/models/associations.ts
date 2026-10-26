import { Article } from "../modules/articles/article.model.js"
import { AuditLog } from "../modules/audit-logs/audit-log.model.js"
import { Invitation } from "../modules/invitations/invitation.model.js"
import { Resource } from "../modules/resources/resource.model.js"
import { Simulation } from "../modules/simulations/simulation.model.js"
import { User } from "../modules/users/user.model.js"

export function defineAssociations() {
    User.hasMany(Article, { foreignKey: "createdById", as: "articles" });
    Article.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });
    
    User.hasMany(AuditLog, { foreignKey: "userId", as: "auditLogs", onDelete: "SET NULL"  });
    AuditLog.belongsTo(User, { foreignKey: "userId", as: "user" });
    
    User.hasMany(Invitation, { foreignKey: "invitedById", as: "sentInvitations" });
    Invitation.belongsTo(User, { foreignKey: "invitedById", as: "invitedBy" });

    User.hasMany(Resource, { foreignKey: "authorId", as: "resources" });
    Resource.belongsTo(User, { foreignKey: "authorId", as: "author" });

    Resource.hasMany(AuditLog, { foreignKey: "userId", as: "auditLogs" });
    AuditLog.belongsTo(Resource, { foreignKey: "userId", as: "resource" });

    //Article.belongsToMany(Resource, { through: ArticleResource, foreignKey: "articleId", otherKey: "resourceId", as: "resources" });
    //Resource.belongsToMany(Article, { through: ArticleResource, foreignKey: "resourceId", otherKey: "articleId", as: "articles" });
    
    //Resource.belongsToMany(Simulation, { through: SimulationResource, foreignKey: "resourceId", otherKey: "simulationId", as: "simulations" });
    //Simulation.belongsToMany(Resource, { through: SimulationResource, foreignKey: "simulationId", otherKey: "resourceId", as: "resources" });

    //Simulation.belongsToMany(Article, { through: SimulationArticle, foreignKey: "simulationId", otherKey: "articleId", as: "articles" });
    //Article.belongsToMany(Simulation, { through: SimulationArticle, foreignKey: "articleId", otherKey: "simulationId", as: "simulations" }); 
}