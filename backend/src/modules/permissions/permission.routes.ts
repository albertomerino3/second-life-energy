import { Router } from 'express';
import { PermissionController } from './permission.controller.js';
import { validateIdParams } from "../../middlewares/validate-id.middleware.js";

const router = Router();

router.get('/', PermissionController.getAll);
router.get('/:id', validateIdParams, PermissionController.getById);
router.post('/', PermissionController.create);
router.put('/:id', validateIdParams, PermissionController.update);
router.delete('/:id', validateIdParams, PermissionController.delete);

export default router;