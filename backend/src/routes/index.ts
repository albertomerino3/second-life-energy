import { Router } from "express";
import bicycleRoutes from "../modules/users/user.routes.js";
import brandRoutes from "../modules/resources/resource.routes.js";
import bicycleDetailRoutes from "../modules/articles/article.routes.js";
import customerRoutes from "../modules/customers/customer.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import orderItemRoutes from "../modules/order-items/order-item.routes.js";

const router = Router();

router.use("/bicycles", bicycleRoutes);
router.use("/brands", brandRoutes);
router.use("/bicycle-details", bicycleDetailRoutes);
router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/order-items", orderItemRoutes);

export default router;