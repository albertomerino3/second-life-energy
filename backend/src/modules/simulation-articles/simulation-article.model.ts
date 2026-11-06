import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// Join table: many-to-many relationship between Simulation and Article
export class SimulationArticle extends Model<
    InferAttributes<SimulationArticle>,
    InferCreationAttributes<SimulationArticle>
> {
    declare simulationId: number;
    declare articleId: number;
}

SimulationArticle.init(
    {
        simulationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        articleId: {
            type: DataTypes.INTEGER,
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
