// Import your entities
import { Permission } from '../modules/permissions/permission.model';
import { RolePermission } from '../modules/role-permissions/role-permission.model';
import { ForumCategory } from '../modules/forum-categories/forum-category.model';
import { Question } from '../modules/questions/question.model';
import { Answer } from '../modules/answers/answer.model';
import { Moderation } from '../modules/moderations/moderation.model';

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
}