import { Router } from 'express';
import { ForumCategoryController } from './forum-category.controller.js';
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get('/', ForumCategoryController.getAll);
router.get('/:id', validateIdParams, ForumCategoryController.getById);
router.post('/', ForumCategoryController.create);
router.put('/:id', validateIdParams, ForumCategoryController.update);
router.delete('/:id', validateIdParams, ForumCategoryController.delete);

export default router;