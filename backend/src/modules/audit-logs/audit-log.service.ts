import { AuditLog } from "./audit-log.model.js";

export class AuditLogService {
    static async findAll() {
        return AuditLog.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return AuditLog.findByPk(id);
    }

    static async create(data: {
        userId: number;
        entity: string;
        entityId: number;
        action: string;
        previousValues?: object | null;
        newValues: object | null;
    }) {
        return AuditLog.create({
            ...data,
            previousValues: data.previousValues ?? null,
            newValues: data.newValues ?? null,
        });
    }

    static async update(
        auditLog: AuditLog,
        data: {
            userId?: number;
            entity?: string;
            entityId?: number;
            action?: string;
            previousValues?: object | null;
            newValues?: object | null;
        }
    ) {
        return auditLog.update(data);
    }

    static async delete(auditLog: AuditLog) {
        await auditLog.destroy();
    }
}