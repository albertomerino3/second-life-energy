import { Router } from 'express';
import permissionRoutes from '../modules/permissions/permission.routes.js';
import rolePermissionRoutes from '../modules/role-permissions/role-permission.routes.js';
import forumCategoryRoutes from '../modules/forum-categories/forum-category.routes.js';
import questionRoutes from '../modules/questions/question.routes.js';
import answerRoutes from '../modules/answers/answer.routes.js';
import moderationRoutes from '../modules/moderations/moderation.routes.js';
import articleRoutes from "../modules/articles/article.routes.js";
import auditLogRoutes from "../modules/audit-logs/audit-log.routes.js";
import invitationRoutes from "../modules/invitations/invitation.routes.js";
import resourceRoutes from "../modules/resources/resource.routes.js";
import simulationRoutes from "../modules/simulations/simulation.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import tagRoutes from "../modules/users/user.routes.js";
import resourceRoutes from "../modules/resources/resource.routes.js";

const router = Router();

router.use('/permissions', permissionRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/forum-categories', forumCategoryRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);
router.use('/moderations', moderationRoutes);
router.use("/articles", articleRoutes);
router.use("/audit-logs", auditLogRoutes);
router.use("/invitations", invitationRoutes);
router.use("/resources", resourceRoutes);
router.use("/simulations", simulationRoutes);
router.use("/users", userRoutes);
router.use("/tags", tagRoutes);
router.use("/resource-tags", resourceRoutes);

export default router;