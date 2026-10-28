import { Router } from 'express';

import answerRoutes from "../modules/answers/answer.routes.js";
import articleCategoryRoutes from "../modules/article-categories/article-category.routes.js";
import articleImageRoutes from "../modules/article-images/article-image.routes.js";
import articleResourceRoutes from "../modules/article-resources/article-resource.routes.js";
import articleReviewRoutes from "../modules/article-reviews/article-review.routes.js";
import articleRoutes from "../modules/articles/article.routes.js";
import auditLogRoutes from "../modules/audit-logs/audit-log.routes.js";
import forumCategoryRoutes from "../modules/forum-categories/forum-category.routes.js";";
import invitationRoutes from "../modules/invitations/invitation.routes.js";
import kitComponentRoutes from "../modules/kit-components/kit-component.routes.js";
import moderationRoutes from '../modules/moderations/moderation.routes.js';
import permissionRoutes from '../modules/permissions/permission.routes.js';
import questionRoutes from '../modules/questions/question.routes.js';
import requestItemRoutes from '../modules/request-items/request-item.routes.js';
import resourceRoutes from "../modules/resources/resource.routes.js";
import rolePermissionRoutes from '../modules/role-permissions/role-permission.routes.js';
import simulationRoutes from "../modules/simulations/simulation.routes.js";
import userRoutes from "../modules/users/user.routes.js";

const router = Router();

router.use('/answers', answerRoutes);
router.use('/article-categories', articleCategoryRoutes);
router.use('/article-images', articleImageRoutes);
router.use('/article-resources', articleResourceRoutes);
router.use('/article-reviews', articleReviewRoutes);
router.use("/articles", articleRoutes);
router.use("/audit-logs", auditLogRoutes);
router.use('/forum-categories', forumCategoryRoutes);
router.use("/invitations", invitationRoutes);
router.use("/kit-components", kitComponentRoutes);
router.use('/moderations', moderationRoutes);
router.use('/permissions', permissionRoutes);
router.use('/questions', questionRoutes);
router.use("/request-items", requestItemRoutes);
router.use("/resources", resourceRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use("/simulations", simulationRoutes);
router.use("/users", userRoutes);

export default router;