import { Router } from 'express';
import { PermissionController } from './permission.controller.js';
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get('/', authorize("permissions:read"), PermissionController.getAll);
router.get('/:id', authorize("permissions:read"), PermissionController.getById);
router.post('/', authorize("permissions:create"), PermissionController.create);
router.put('/:id', authorize("permissions:update"), PermissionController.update);
router.delete('/:id', authorize("permissions:delete"), PermissionController.delete);

export default router;