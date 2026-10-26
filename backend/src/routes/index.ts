import { Router } from 'express';
import permissionRoutes from '../modules/permissions/permission.routes.js';
import rolePermissionRoutes from '../modules/role-permissions/role-permission.routes.js';
import forumCategoryRoutes from '../modules/forum-categories/forum-category.routes.js';
import questionRoutes from '../modules/questions/question.routes.js';
import answerRoutes from '../modules/answers/answer.routes.js';
import moderationRoutes from '../modules/moderations/moderation.routes.js';

const router = Router();

router.use('/permissions', permissionRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/forum-categories', forumCategoryRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);
router.use('/moderations', moderationRoutes);

export default router;