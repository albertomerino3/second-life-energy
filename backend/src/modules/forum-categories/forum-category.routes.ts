import { Router } from 'express';
import { ForumCategoryController } from './forum-category.controller.js';
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get('/', authorize("forum-categories:read"), ForumCategoryController.getAll);
router.get('/:id', authorize("forum-categories:read"), ForumCategoryController.getById);
router.post('/', authorize("forum-categories:create"), ForumCategoryController.create);
router.put('/:id', authorize("forum-categories:update"), ForumCategoryController.update);
router.delete('/:id', authorize("forum-categories:delete"), ForumCategoryController.delete);

export default router;