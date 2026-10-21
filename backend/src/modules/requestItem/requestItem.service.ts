import { RequestItem } from "./requestItem.model.js";

export class RequestItemService {

    //OBTENER TODAS LAS BICICLETAS (y la marca asociada)

    static async findAll() {
        return RequestItem.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return RequestItem.findByPk(id);
    }

    static async create(data: {
        requestId: number,
        articleId: number,
        quantity: number;
    }) {
        return RequestItem.create(data);
    }

    static async update(
        requestItem: RequestItem,
        data: {
            requestId?: number;
            articleId?: number;
            quantity?: number;
        }
    ) {
        return requestItem.update(data);
    }

    static async delete(requestItem: RequestItem) {
        await requestItem.destroy();
    }
}