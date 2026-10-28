// Import your entities
import { Answer } from '../modules/answers/answer.model.js';
import { ArticleCategory } from '../modules/article-categories/article-category.model.js';
import { ArticleImage } from '../modules/article-images/article-image.model.js';
import { ArticleResource } from '../modules/article-resources/article-resource.model.js';
import { ArticleReview } from '../modules/article-reviews/article-review.model.js';
import { Article } from "../modules/articles/article.model.js"
import { AuditLog } from "../modules/audit-logs/audit-log.model.js"
import { ForumCategory } from '../modules/forum-categories/forum-category.model.js';
import { Invitation } from "../modules/invitations/invitation.model.js"
import { KitComponent } from '../modules/kit-components/kit-component.model.js';
import { Moderation } from '../modules/moderations/moderation.model.js';
import { Permission } from '../modules/permissions/permission.model.js';
import { Question } from '../modules/questions/question.model.js';
import { RequestItem } from "../modules/request-items/request-item.model.js"
import { Resource } from "../modules/resources/resource.model.js"
import { RolePermission } from '../modules/role-permissions/role-permission.model.js';
import { Simulation } from "../modules/simulations/simulation.model.js"
import { User } from "../modules/users/user.model.js"

export function setupAssociations(User: any, Role: any) {
  
   //Roles and Permissions (Many-to-Many)
  // Role grants multiple Permissions through RolePermission table
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: 'roleId',
    otherKey: 'permissionId',
    as: 'permissions',
  });

  // Permission belongs to multiple Roles
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: 'permissionId',
    otherKey: 'roleId',
    as: 'roles',
  });

  // Direct associations for the join table
  RolePermission.belongsTo(Role, { foreignKey: 'roleId' });
  RolePermission.belongsTo(Permission, { foreignKey: 'permissionId' });

  // Forum Categories and Questions
  // A Category contains multiple Questions
  ForumCategory.hasMany(Question, {
    foreignKey: 'categoryId',
    as: 'questions',
  });
  Question.belongsTo(ForumCategory, {
    foreignKey: 'categoryId',
    as: 'category',
  });

  // Questions and Users (Author)
  // A User posts multiple Questions
  User.hasMany(Question, {
    foreignKey: 'authorId',
    as: 'questions',
  });
  Question.belongsTo(User, {
    foreignKey: 'authorId',
    as: 'author',
  });

  // Questions and Answers
  // A Question receives multiple Answers
  Question.hasMany(Answer, {
    foreignKey: 'questionId',
    as: 'answers',
    onDelete: 'CASCADE',
  });
  Answer.belongsTo(Question, {
    foreignKey: 'questionId',
    as: 'question',
  });

  // A User writes multiple Answers
  User.hasMany(Answer, {
    foreignKey: 'authorId',
    as: 'answers',
  });
  Answer.belongsTo(User, {
    foreignKey: 'authorId',
    as: 'author',
  });

  // One Answer can be accepted as the solution for a Question (1-to-1)
  Question.belongsTo(Answer, {
    foreignKey: 'acceptedAnswerId',
    as: 'acceptedAnswer',
    constraints: false,
  });

  // 5. Moderation Records
  // A Moderator (User) performs moderation actions
  User.hasMany(Moderation, {
    foreignKey: 'moderatorId',
    as: 'moderationsPerformed',
  });
  Moderation.belongsTo(User, {
    foreignKey: 'moderatorId',
    as: 'moderator',
  });

  // A Question can be moderated (has moderation logs)
  Question.hasMany(Moderation, {
    foreignKey: 'questionId',
    as: 'moderations',
  });
  Moderation.belongsTo(Question, {
    foreignKey: 'questionId',
    as: 'question',
  });

  // An Answer can be moderated (has moderation logs)
  Answer.hasMany(Moderation, {
    foreignKey: 'answerId',
    as: 'moderations',
  });
  Moderation.belongsTo(Answer, {
    foreignKey: 'answerId',
    as: 'answer',
  });
  
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

  Article.belongsToMany(Resource, { through: ArticleResource, foreignKey: "articleId", otherKey: "resourceId", as: "resources" });
  Resource.belongsToMany(Article, { through: ArticleResource, foreignKey: "resourceId", otherKey: "articleId", as: "articles" });
    
  //Resource.belongsToMany(Simulation, { through: SimulationResource, foreignKey: "resourceId", otherKey: "simulationId", as: "simulations" });
  //Simulation.belongsToMany(Resource, { through: SimulationResource, foreignKey: "simulationId", otherKey: "resourceId", as: "resources" });

  //Simulation.belongsToMany(Article, { through: SimulationArticle, foreignKey: "simulationId", otherKey: "articleId", as: "articles" });
  //Article.belongsToMany(Simulation, { through: SimulationArticle, foreignKey: "articleId", otherKey: "simulationId", as: "simulations" }); 
}