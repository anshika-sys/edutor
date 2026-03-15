const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LessonProgress = sequelize.define('LessonProgress', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  lesson_id: { type: DataTypes.INTEGER, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  completed_at: { type: DataTypes.DATE },
}, { tableName: 'lesson_progress', timestamps: false });

module.exports = LessonProgress;
