import { Request, Response, NextFunction } from "express";
import { RbacService } from "./rbac.service.js";

export const authorize = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userId = res.locals.authUser?.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const permissions = await RbacService.getUserPermissions(userId);

    if (!permissions.includes(requiredPermission)) {
      res.status(403).json({ message: "Forbidden: insufficient permissions" });
      return;
    }

    next();
  };
};
