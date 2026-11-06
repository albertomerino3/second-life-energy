import { KitComponent } from "./kit-component.model.js";
import { Article } from "../articles/article.model.js";
import { HttpError } from "../../utils/http-error.js";

const includeRelations = [
    { model: Article, as: "kit", attributes: ["id", "name", "type"] },
    { model: Article, as: "component", attributes: ["id", "name", "type", "stock"] },
];

// The kit must be an article of type "kit" and the component one of type "component"
async function checkArticleTypes(kitId: number, componentId: number) {
    const [kit, component] = await Promise.all([
        Article.findByPk(kitId),
        Article.findByPk(componentId),
    ]);
    if (!kit || !component) {
        throw new HttpError(404, "Kit or component not found");
    }
    if (kit.type !== "kit") {
        throw new HttpError(400, "kitId must reference an article of type 'kit'");
    }
    if (component.type !== "component") {
        throw new HttpError(400, "componentId must reference an article of type 'component'");
    }
}

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
        await checkArticleTypes(data.kitId, data.componentId);
        await KitComponent.create(data);
        return KitComponentService.findById(data.kitId, data.componentId);
    }

    // Only the quantity can change: the composite key identifies the relationship
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
