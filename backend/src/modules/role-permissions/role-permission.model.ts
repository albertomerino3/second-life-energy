import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../../config/database.js';

// Join table: many-to-many relationship between Role and Permission
export class RolePermission extends Model {
  public roleId!: number;
  public permissionId!: number;
}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, // Foreign key to Role
    },
    permissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, // Foreign key to Permission
    },
  },
  {
    sequelize,
    tableName: 'role_permissions',
    timestamps: false,
  }
);