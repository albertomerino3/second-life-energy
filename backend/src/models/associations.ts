import { User } from "../modules/users/user.model.js";
import { Role } from "../modules/roles/role.model.js";
import { Permission } from "../modules/permissions/permission.model.js";
import { UserRole } from "../modules/user-roles/user-role.model.js";
import { RolePermission } from "../modules/role-permissions/role-permission.model.js";
import { Invitation } from "../modules/invitations/invitation.model.js";
import { ArticleCategory } from "../modules/article-categories/article-category.model.js";
import { Article } from "../modules/articles/article.model.js";
import { KitComponent } from "../modules/kit-components/kit-component.model.js";
import { ArticleImage } from "../modules/article-images/article-image.model.js";
import { StockMovement } from "../modules/stock-movements/stock-movement.model.js";
import { Request } from "../modules/requests/request.model.js";
import { RequestItem } from "../modules/request-items/request-item.model.js";
import { Resource } from "../modules/resources/resource.model.js";
import { Tag } from "../modules/tags/tag.model.js";
import { ResourceTag } from "../modules/resource-tags/resource-tag.model.js";
import { ArticleResource } from "../modules/article-resources/article-resource.model.js";
import { ForumCategory } from "../modules/forum-categories/forum-category.model.js";
import { Question } from "../modules/questions/question.model.js";
import { Answer } from "../modules/answers/answer.model.js";
import { Moderation } from "../modules/moderations/moderation.model.js";
import { Simulation } from "../modules/simulations/simulation.model.js";
import { SimulationArticle } from "../modules/simulation-articles/simulation-article.model.js";
import { SimulationResource } from "../modules/simulation-resources/simulation-resource.model.js";
import { ArticleReview } from "../modules/article-reviews/article-review.model.js";
import { AuditLog } from "../modules/audit-logs/audit-log.model.js";

export function setupAssociations() {
    User.belongsToMany(Role, { through: UserRole, foreignKey: "userId", otherKey: "roleId", as: "roles" });
    Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId", otherKey: "userId", as: "users" });
    User.hasMany(UserRole, { foreignKey: "userId", as: "userRoles" });
    UserRole.belongsTo(User, { foreignKey: "userId", as: "user" });
    Role.hasMany(UserRole, { foreignKey: "roleId", as: "userRoles" });
    UserRole.belongsTo(Role, { foreignKey: "roleId", as: "role" });

    Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId", otherKey: "permissionId", as: "permissions" });
    Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId", otherKey: "roleId", as: "roles" });
    RolePermission.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    RolePermission.belongsTo(Permission, { foreignKey: "permissionId", as: "permission" });

    User.hasMany(Invitation, { foreignKey: "invitedById", as: "sentInvitations" });
    Invitation.belongsTo(User, { foreignKey: "invitedById", as: "invitedBy" });
    Role.hasMany(Invitation, { foreignKey: "roleId", as: "invitations" });
    Invitation.belongsTo(Role, { foreignKey: "roleId", as: "role" });

    ArticleCategory.hasMany(ArticleCategory, { foreignKey: "parentCategoryId", as: "subcategories" });
    ArticleCategory.belongsTo(ArticleCategory, { foreignKey: "parentCategoryId", as: "parentCategory" });

    ArticleCategory.hasMany(Article, { foreignKey: "categoryId", as: "articles" });
    Article.belongsTo(ArticleCategory, { foreignKey: "categoryId", as: "category" });
    User.hasMany(Article, { foreignKey: "createdById", as: "articles" });
    Article.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });

    Article.belongsToMany(Article, { through: KitComponent, foreignKey: "kitId", otherKey: "componentId", as: "components" });
    Article.belongsToMany(Article, { through: KitComponent, foreignKey: "componentId", otherKey: "kitId", as: "kits" });
    Article.hasMany(KitComponent, { foreignKey: "kitId", as: "kitComponents" });
    KitComponent.belongsTo(Article, { foreignKey: "kitId", as: "kit" });
    KitComponent.belongsTo(Article, { foreignKey: "componentId", as: "component" });

    Article.hasMany(ArticleImage, { foreignKey: "articleId", as: "images" });
    ArticleImage.belongsTo(Article, { foreignKey: "articleId", as: "article" });

    Article.hasMany(StockMovement, { foreignKey: "articleId", as: "stockMovements" });
    StockMovement.belongsTo(Article, { foreignKey: "articleId", as: "article" });
    User.hasMany(StockMovement, { foreignKey: "userId", as: "stockMovements" });
    StockMovement.belongsTo(User, { foreignKey: "userId", as: "user" });

    Request.hasMany(RequestItem, { foreignKey: "requestId", as: "items" });
    RequestItem.belongsTo(Request, { foreignKey: "requestId", as: "request" });
    Article.hasMany(RequestItem, { foreignKey: "articleId", as: "requestItems" });
    RequestItem.belongsTo(Article, { foreignKey: "articleId", as: "article" });

    User.hasMany(Resource, { foreignKey: "authorId", as: "resources" });
    Resource.belongsTo(User, { foreignKey: "authorId", as: "author" });

    Resource.belongsToMany(Tag, { through: ResourceTag, foreignKey: "resourceId", otherKey: "tagId", as: "tags" });
    Tag.belongsToMany(Resource, { through: ResourceTag, foreignKey: "tagId", otherKey: "resourceId", as: "resources" });
    ResourceTag.belongsTo(Resource, { foreignKey: "resourceId", as: "resource" });
    ResourceTag.belongsTo(Tag, { foreignKey: "tagId", as: "tag" });

    Article.belongsToMany(Resource, { through: ArticleResource, foreignKey: "articleId", otherKey: "resourceId", as: "resources" });
    Resource.belongsToMany(Article, { through: ArticleResource, foreignKey: "resourceId", otherKey: "articleId", as: "articles" });
    ArticleResource.belongsTo(Article, { foreignKey: "articleId", as: "article" });
    ArticleResource.belongsTo(Resource, { foreignKey: "resourceId", as: "resource" });

    ForumCategory.hasMany(Question, { foreignKey: "categoryId", as: "questions" });
    Question.belongsTo(ForumCategory, { foreignKey: "categoryId", as: "category" });
    User.hasMany(Question, { foreignKey: "authorId", as: "questions" });
    Question.belongsTo(User, { foreignKey: "authorId", as: "author" });

    Question.hasMany(Answer, { foreignKey: "questionId", as: "answers" });
    Answer.belongsTo(Question, { foreignKey: "questionId", as: "question" });
    User.hasMany(Answer, { foreignKey: "authorId", as: "answers" });
    Answer.belongsTo(User, { foreignKey: "authorId", as: "author" });

    Question.belongsTo(Answer, { foreignKey: "acceptedAnswerId", as: "acceptedAnswer", constraints: false });
    Answer.hasOne(Question, { foreignKey: "acceptedAnswerId", as: "acceptedForQuestion", constraints: false });

    User.hasMany(Moderation, { foreignKey: "moderatorId", as: "moderations" });
    Moderation.belongsTo(User, { foreignKey: "moderatorId", as: "moderator" });
    Question.hasMany(Moderation, { foreignKey: "questionId", as: "moderations" });
    Moderation.belongsTo(Question, { foreignKey: "questionId", as: "question" });
    Answer.hasMany(Moderation, { foreignKey: "answerId", as: "moderations" });
    Moderation.belongsTo(Answer, { foreignKey: "answerId", as: "answer" });

    Simulation.belongsToMany(Article, { through: SimulationArticle, foreignKey: "simulationId", otherKey: "articleId", as: "articles" });
    Article.belongsToMany(Simulation, { through: SimulationArticle, foreignKey: "articleId", otherKey: "simulationId", as: "simulations" });
    SimulationArticle.belongsTo(Simulation, { foreignKey: "simulationId", as: "simulation" });
    SimulationArticle.belongsTo(Article, { foreignKey: "articleId", as: "article" });

    Simulation.belongsToMany(Resource, { through: SimulationResource, foreignKey: "simulationId", otherKey: "resourceId", as: "resources" });
    Resource.belongsToMany(Simulation, { through: SimulationResource, foreignKey: "resourceId", otherKey: "simulationId", as: "simulations" });
    SimulationResource.belongsTo(Simulation, { foreignKey: "simulationId", as: "simulation" });
    SimulationResource.belongsTo(Resource, { foreignKey: "resourceId", as: "resource" });

    Article.hasMany(ArticleReview, { foreignKey: "articleId", as: "reviews" });
    ArticleReview.belongsTo(Article, { foreignKey: "articleId", as: "article" });
    User.hasMany(ArticleReview, { foreignKey: "reviewerId", as: "reviews" });
    ArticleReview.belongsTo(User, { foreignKey: "reviewerId", as: "reviewer" });

    User.hasMany(AuditLog, { foreignKey: "userId", as: "auditLogs" });
    AuditLog.belongsTo(User, { foreignKey: "userId", as: "user" });
}
