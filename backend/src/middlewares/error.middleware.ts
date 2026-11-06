import { Request, Response, NextFunction } from "express";
import {
    DatabaseError,
    ForeignKeyConstraintError,
    UniqueConstraintError,
    ValidationError,
} from "sequelize";
import { HttpError } from "../utils/http-error.js";

export function errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Business rules thrown by the services
    if (error instanceof HttpError) {
        res.status(error.status).json({
            message: error.message,
        });
        return;
    }

    // Malformed JSON body
    if ("type" in error && error.type === "entity.parse.failed") {
        res.status(400).json({
            message: "Invalid JSON body",
        });
        return;
    }

    // Duplicated value of a unique column (email, slug, code...)
    if (error instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "A record with the same unique value already exists",
            fields: Object.keys(error.fields ?? {}),
        });
        return;
    }

    // Model validations (allowNull, isEmail, isIn, min...)
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

    // The referenced record does not exist, or the record is still referenced
    if (error instanceof ForeignKeyConstraintError) {
        res.status(409).json({
            message: "The operation violates a relationship between records",
            detail: error.index ?? error.table ?? undefined,
        });
        return;
    }

    // ON DELETE RESTRICT (PostgreSQL code 23001): the record is still in use
    if (error instanceof DatabaseError && (error.parent as { code?: string })?.code === "23001") {
        res.status(409).json({
            message: "The record cannot be deleted because other records depend on it",
        });
        return;
    }

    // Values the database cannot store (e.g. text in an integer column)
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
