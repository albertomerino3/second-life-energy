import { Router } from 'express';
import { RolePermissionController } from './role-permission.controller.js';

const router = Router();

router.get('/role/:roleId', RolePermissionController.getByRoleId);
router.post('/', RolePermissionController.assign);
router.delete('/:roleId/:permissionId', RolePermissionController.revoke);

export default router;