import { Router } from "express";
import { InvitationController } from "./invitation.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("invitations:read"), InvitationController.getAll);

router.get("/:id", authorize("invitations:read"), InvitationController.getById);

router.post("/", authorize("invitations:read"), InvitationController.create);

router.put("/:id", authorize("invitations:read"), InvitationController.update);

router.delete("/:id", authorize("invitations:read"), InvitationController.delete);

export default router;