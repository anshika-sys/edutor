const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'), allowNull: false },
  phone: { type: DataTypes.STRING(15), allowNull: false },
  role: { type: DataTypes.ENUM('Student', 'Working Professional', 'Teacher'), defaultValue: 'Student' },
  reset_token: { type: DataTypes.STRING(255), allowNull: true },
  reset_token_expiry: { type: DataTypes.DATE, allowNull: true },
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false });

module.exports = User;
