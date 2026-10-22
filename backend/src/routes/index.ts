import { Router } from "express";
import articleRoutes from "../modules/articles/article.routes.js";
import auditLogRoutes from "../modules/audit-logs/audit-log.routes.js";
import invitationRoutes from "../modules/invitations/invitation.routes.js";
import resourceRoutes from "../modules/resources/resource.routes.js";
import simulationRoutes from "../modules/simulations/simulation.routes.js";
import userRoutes from "../modules/users/user.routes.js";

const router = Router();

router.use("/articles", articleRoutes);
router.use("/audit-logs", auditLogRoutes);
router.use("/invitations", invitationRoutes);
router.use("/resources", resourceRoutes);
router.use("/simulations", simulationRoutes);
router.use("/users", userRoutes);

export default router;