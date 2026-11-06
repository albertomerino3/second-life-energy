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
            errors: error.errors.map((item) => ({
                field: item.path,
                message: item.message,
            })),
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
