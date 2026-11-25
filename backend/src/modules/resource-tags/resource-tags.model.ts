import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class ResourceTag extends Model<
    InferAttributes<ResourceTag>,
    InferCreationAttributes<ResourceTag>
> {
    declare resourceId: CreationOptional<number>;
    declare tagId: CreationOptional<number>;
    
}
ResourceTag.init(
    {
        resourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
    
        tagId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

       
    },
    {
        sequelize,
        tableName: "tags",
        modelName: "Tag",
        timestamps: true,
    }
);