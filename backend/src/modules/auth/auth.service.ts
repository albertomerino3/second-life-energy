import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model.js";
import { env } from "../../config/env.js";

export class AuthService {

  static async validateCredentials(
    email: string,
    password: string
  ): Promise<User | null> {

    // El defaultScope de User oculta passwordHash; aquí lo necesitamos para comparar.
    const user = await User.unscoped().findOne({
      where: { email }
    });

    if (!user || !user.isActive) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return null;
    }

    return user;
  }

  static async generateToken(userId: number): Promise<string | null> {
    const secret = env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not configured");

    const token = jwt.sign({}, secret, {
      algorithm: "HS256",
      subject: String(userId),
      expiresIn: "1h",
      issuer: "second-life-energy-api",
      audience: "second-life-energy-client"
    });

    return token;
  }
}
