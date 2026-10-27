import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/database.js';

export class Permission extends Model {
  public id!: number;
  public code!: string;
  public description!: string;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Unique permission code
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'permissions',
    timestamps: false,
  }
);