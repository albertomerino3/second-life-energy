import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../../config/database.js";

// Join table: many-to-many relationship between Resource and Tag
export class ResourceTag extends Model<
    InferAttributes<ResourceTag>,
    InferCreationAttributes<ResourceTag>
> {
    declare resourceId: number;
    declare tagId: number;
}

ResourceTag.init(
    {
        resourceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        tagId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "resource_tags",
        modelName: "ResourceTag",
        timestamps: false,
    }
);
