import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Tag extends Model<
    InferAttributes<Tag>,
    InferCreationAttributes<Tag>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare slug: string;
}
Tag.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
    
        name: {
            type: DataTypes.STRING(80),
            allowNull: true,
        },

        slug: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
       
    },
    {
        sequelize,
        tableName: "tags",
        modelName: "Tag",
        timestamps: true,
    }
);