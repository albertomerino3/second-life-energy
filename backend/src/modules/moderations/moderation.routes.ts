import { Router } from 'express';
import { ModerationController } from './moderation.controller.js';

const router = Router();

router.get('/', ModerationController.getAll);
router.get('/:id', ModerationController.getById);
router.post('/', ModerationController.create);

export default router;