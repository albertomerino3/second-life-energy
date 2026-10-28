import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/database.js';

export class Answer extends Model {
  public id!: number;
  public questionId!: number;
  public authorId!: number;
  public content!: string;
  public status!: string;
  public createdAt!: Date;
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key to Question
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key to User (author)
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'published',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'answers',
    timestamps: false,
  }
);