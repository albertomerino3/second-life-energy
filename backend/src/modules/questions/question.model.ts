import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/database.js';

export class Question extends Model {
  public id!: number;
  public categoryId!: number;
  public authorId!: number;
  public acceptedAnswerId!: number;
  public title!: string;
  public content!: string;
  public status!: string;
  public createdAt!: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key to ForumCategory
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key to User (creator)
    },
    acceptedAnswerId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Foreign key to Answer chosen as solution
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'questions',
    timestamps: false,
  }
);