import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/database.js';

export class Moderation extends Model {
  public id!: number;
  public moderatorId!: number;
  public questionId!: number;
  public answerId!: number;
  public action!: string;
  public reason!: string;
  public createdAt!: Date;
}

Moderation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    moderatorId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key to User (moderator)
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Nullable: filled if a Question is being moderated
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Nullable: filled if an Answer is being moderated
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'moderations',
    modelName: 'Moderation',
    timestamps: false,
  }
);