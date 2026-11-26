import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {

	static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email, password } = res.locals.authUser;
			if (!email || !password) {
				res.status(400).json({ message: "Email and password are required" });
				return;
			}

			const user = await AuthService.validateCredentials(email, password);
			if (!user) {
				res.status(401).json({ message: "Non valid credentials" });
				return;
			}

			const token = await AuthService.generateToken(user.id);

			res.status(200).json({ message: "Auth OK", token, tokenType: "Bearer", expiresIn: 3600 });
		} catch (error) {
			next(error);
		}
	}

}
