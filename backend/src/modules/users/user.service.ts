import { Bicycle } from "./user.model.js";
import { Brand } from "../resources/resource.model.js"
import { BicycleDetail } from "../articles/article.model.js";
import { FindOptions } from "sequelize";

export class BicycleService {
    static async findAll() {
        return Bicycle.findAll({
            order: [["id", "ASC"]],
        });
    }
    
    static async findEagerlyById(id: number) {
        return Bicycle.findByPk(id, {
            include: [
                {
                    model: Brand,
                    as: 'brand'
                }
            ]
        });
    }

    static async findAllEagerlyByFrameMaterial(frameMaterial: string) {
        return Bicycle.findAll({
            include: [
                {
                    model: BicycleDetail,
                    as: 'detail',
                    where: {
                        frameMaterial
                    }
                }
            ],
            order: [["id", "ASC"]]
        });
    }

    static async findById(id: number, options?: FindOptions) {
        return Bicycle.findByPk(id, options);
    }
    
    static async create(data: {
        brandId: number;
        model: string;
        description?: string | null;
        price: number;
        stock: number;
    }) {
        return Bicycle.create(data);
    }
    
    static async update(
        bicycle: Bicycle,
        data: {
            brandId?: number;
            model?: string;
            description?: string | null;
            price?: number;
            stock?: number;
        }
    ) {
        return bicycle.update(data);
    }
    
    static async delete(bicycle: Bicycle) {
        await bicycle.destroy();
    }
}