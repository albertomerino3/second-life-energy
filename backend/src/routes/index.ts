import { Router } from "express";
import bicycleRoutes from "../modules/users/user.routes.js";
import brandRoutes from "../modules/resources/resource.routes.js";
import bicycleDetailRoutes from "../modules/articles/article.routes.js";

const router = Router();

router.use("/bicycles", bicycleRoutes);
router.use("/brands", brandRoutes);
router.use("/bicycle-details", bicycleDetailRoutes);

export default router;