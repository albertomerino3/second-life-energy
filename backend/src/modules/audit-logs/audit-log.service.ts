import { WhereOptions } from "sequelize";
import { AuditLog } from "./audit-log.model.js";
import { User } from "../users/user.model.js";

const includeUser = [{ model: User, as: "user", attributes: ["id", "name", "email"] }];

export class AuditLogService {
    static async findAll(filters: { entity?: string; entityId?: number; userId?: number } = {}) {
        const where: WhereOptions = {};

        if (filters.entity) {
            Object.assign(where, { entity: filters.entity });
        }
        if (filters.entityId) {
            Object.assign(where, { entityId: filters.entityId });
        }
        if (filters.userId) {
            Object.assign(where, { userId: filters.userId });
        }

        return AuditLog.findAll({
            where,
            include: includeUser,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return AuditLog.findByPk(id, {
            include: includeUser,
        });
    }

    static async create(data: {
        userId?: number | null;
        entity: string;
        entityId: number;
        action: string;
        previousValues?: object | null;
        newValues?: object | null;
    }) {
        return AuditLog.create({
            ...data,
            userId: data.userId ?? null,
            previousValues: data.previousValues ?? null,
            newValues: data.newValues ?? null,
        });
    }

    static async update(
        auditLog: AuditLog,
        data: {
            userId?: number | null;
            entity?: string;
            entityId?: number;
            action?: string;
            previousValues?: object | null;
            newValues?: object | null;
        }
    ) {
        return auditLog.update(data, {
            fields: ["userId", "entity", "entityId", "action", "previousValues", "newValues"],
        });
    }

    static async delete(auditLog: AuditLog) {
        await auditLog.destroy();
    }
}
