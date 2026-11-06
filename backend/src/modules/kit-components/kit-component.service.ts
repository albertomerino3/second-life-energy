import { KitComponent } from "./kit-component.model.js";
import { Article } from "../articles/article.model.js";

const includeRelations = [
    { model: Article, as: "kit", attributes: ["id", "name", "type"] },
    { model: Article, as: "component", attributes: ["id", "name", "type", "stock"] },
];

export class KitComponentService {
    static async findAll(filters: { kitId?: number } = {}) {
        return KitComponent.findAll({
            where: filters.kitId ? { kitId: filters.kitId } : {},
            include: includeRelations,
            order: [["kitId", "ASC"], ["componentId", "ASC"]],
        });
    }

    static async findById(kitId: number, componentId: number) {
        return KitComponent.findOne({
            where: { kitId, componentId },
            include: includeRelations,
        });
    }

    static async create(data: {
        kitId: number,
        componentId: number,
        quantity?: number;
    }) {
        await KitComponent.create(data);
        return KitComponentService.findById(data.kitId, data.componentId);
    }

    static async update(
        kitComponent: KitComponent,
        data: {
            quantity?: number;
        }
    ) {
        await kitComponent.update(data, { fields: ["quantity"] });
        return KitComponentService.findById(kitComponent.kitId, kitComponent.componentId);
    }

    static async delete(kitComponent: KitComponent) {
        await kitComponent.destroy();
    }
}
