import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { extractBasicAuthHeader } from "../../middlewares/basic-auth-middleware.js";

const router = Router();

// No hay registro público: las cuentas se crean por invitación o desde la gestión de usuarios (HU-06).
router.post("/login", extractBasicAuthHeader, AuthController.login);

export default router;
