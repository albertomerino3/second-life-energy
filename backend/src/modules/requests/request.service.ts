import crypto from "node:crypto";
import { Request } from "./request.model.js";
import { RequestItem } from "../request-items/request-item.model.js";
import { Article } from "../articles/article.model.js";

const includeItems = [
    {
        model: RequestItem,
        as: "items",
        include: [
            {
                model: Article,
                as: "article",
                attributes: ["id", "name", "type", "stock", "status"],
            },
        ],
    },
];

function generateReference() {
    const year = new Date().getFullYear();
    const random = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `DEMO-${year}-${random}`;
}

export class RequestService {
    static async findAll(filters: { status?: string } = {}) {
        return Request.findAll({
            where: filters.status ? { status: filters.status } : {},
            include: includeItems,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Request.findByPk(id, {
            include: includeItems,
        });
    }

    static async create(data: {
        contactName: string;
        contactEmail: string;
        notes?: string | null;
        status?: string;
    }) {
        const request = await Request.create({
            ...data,
            reference: generateReference(),
        });
        return RequestService.findById(request.id);
    }

    static async update(
        request: Request,
        data: {
            contactName?: string;
            contactEmail?: string;
            notes?: string | null;
            status?: string;
        }
    ) {
        await request.update(data, {
            fields: ["contactName", "contactEmail", "notes", "status"],
        });
        return RequestService.findById(request.id);
    }

    static async delete(request: Request) {
        await request.destroy();
    }
}
