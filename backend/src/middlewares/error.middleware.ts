import { Request, Response, NextFunction } from "express";
import {
    DatabaseError,
    ForeignKeyConstraintError,
    UniqueConstraintError,
    ValidationError,
} from "sequelize";

export function errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if ("type" in error && error.type === "entity.parse.failed") {
        res.status(400).json({
            message: "Invalid JSON body",
        });
        return;
    }

    if (error instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "A record with the same unique value already exists",
            fields: Object.keys(error.fields ?? {}),
        });
        return;
    }

    if (error instanceof ValidationError) {
        res.status(400).json({
            message: "Validation error",
            errors: error.errors.map((item) => ({
                field: item.path,
                message: item.message,
            })),
        });
        return;
    }

    if (error instanceof ForeignKeyConstraintError) {
        res.status(409).json({
            message: "The operation violates a relationship between records",
            detail: error.index ?? error.table ?? undefined,
        });
        return;
    }

    if (error instanceof DatabaseError && (error.parent as { code?: string })?.code === "23001") {
        res.status(409).json({
            message: "The record cannot be deleted because other records depend on it",
        });
        return;
    }

    if (error instanceof DatabaseError) {
        console.error(error);
        res.status(400).json({
            message: "Invalid data for the database",
        });
        return;
    }

    console.error(error);

    res.status(500).json({
        message: "Internal server error",
    });
}
