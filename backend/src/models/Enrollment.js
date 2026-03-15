const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  course_id: { type: DataTypes.INTEGER, allowNull: false },
  purchase_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  progress_percentage: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
}, { tableName: 'enrollments', timestamps: false });

module.exports = Enrollment;
