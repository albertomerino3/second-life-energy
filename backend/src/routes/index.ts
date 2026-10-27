import { Router } from "express";
import tagRoutes from "../modules/users/user.routes.js";
import resourceRoutes from "../modules/resources/resource.routes.js";


const router = Router();

router.use("/tags", tagRoutes);
router.use("/resource-tags", resourceRoutes);


export default router;