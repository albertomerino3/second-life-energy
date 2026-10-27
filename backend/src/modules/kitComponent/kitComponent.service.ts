import { KitComponent } from "./kitComponent.model.js";

export class KitComponentService {

    static async findAll() {
        return KitComponent.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return KitComponent.findByPk(id);
    }

    static async create(data: {
        kitId: number,
        componentId: number,
        quantity: number;
    }) {
        return KitComponent.create(data);
    }

    static async update(
        kitComponent: KitComponent,
        data: {
            kitId?: number;
            componentId?: number;
            quantity?: number;
        }
    ) {
        return kitComponent.update(data);
    }

    static async delete(kitComponent: KitComponent) {
        await kitComponent.destroy();
    }
}