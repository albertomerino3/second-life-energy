import { Router } from "express";
import { KitComponentController } from "./kit-component.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

router.use(bearerAuth);

router.get("/", authorize("kit-components:read"), KitComponentController.getAll);

router.get("/:kitId/:componentId", authorize("kit-components:read"), KitComponentController.getById);

router.post("/", authorize("kit-components:read"), KitComponentController.create);

router.put("/:kitId/:componentId", authorize("kit-components:read"), KitComponentController.update);

router.delete("/:kitId/:componentId", authorize("kit-components:read"), KitComponentController.delete);

export default router;
