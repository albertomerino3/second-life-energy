import { Router } from 'express';
import { QuestionController } from './question.controller.js';

const router = Router();

router.get('/', QuestionController.getAll);
router.get('/:id', QuestionController.getById);
router.get('/category/:categoryId', QuestionController.getByCategoryId);
router.post('/', QuestionController.create);
router.put('/:id', QuestionController.update);
router.delete('/:id', QuestionController.delete);

export default router;