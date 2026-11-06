import { Request, Response, NextFunction } from "express";

/**
 * Checks that every route parameter (:id, :userId, :roleId...) is a
 * positive integer, so invalid ids answer 400 instead of reaching the
 * database and failing with a 500.
 */
export function validateIdParams(req: Request, res: Response, next: NextFunction) {
    for (const [name, value] of Object.entries(req.params)) {
        if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
            res.status(400).json({
                message: `${name} must be a positive integer`,
            });
            return;
        }
    }

    next();
}
