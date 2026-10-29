import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export class SimulationArticle extends Model {
    declare simulationId: number;
    declare articleId: number;
}

SimulationArticle.init(
    {
        simulationId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "simulation_articles",
        modelName: "SimulationArticle",
        timestamps: false,
    }
);