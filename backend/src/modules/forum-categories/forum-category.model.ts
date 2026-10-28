import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/database.js';

export class ForumCategory extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

ForumCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'forum_categories',
    modelName: 'ForumCategory',
    timestamps: false,
  }
);