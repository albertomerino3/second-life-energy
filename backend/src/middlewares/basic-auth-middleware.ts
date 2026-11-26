import { Request, Response, NextFunction } from "express";

export async function extractBasicAuthHeader(req: Request, res: Response, next: NextFunction): Promise<void> {
  const unauthorized = () => {
    res.setHeader("WWW-Authenticate", 'Basic realm="Second Life Energy API"');
    res.status(401).json({ message: "Non valid credentials" });
  };

  const token = req.headers.authorization;
  if (!token || token.indexOf('Basic ') != 0) {
    unauthorized();
    return;
  }

  // Formato "email:password". Se corta en el primer ":" para que la contraseña pueda contenerlo.
  const credentials = Buffer.from(token.split(' ')[1] ?? '', 'base64').toString('utf-8');
  const separator = credentials.indexOf(':');
  if (separator === -1) {
    unauthorized();
    return;
  }

  res.locals.authUser = {
    email: credentials.slice(0, separator).trim(),
    password: credentials.slice(separator + 1)
  };

  next();
}
