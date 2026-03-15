const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  course_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  youtube_video_id: { type: DataTypes.STRING(50), allowNull: false },
  duration: { type: DataTypes.STRING(20) },
  lesson_order: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'lessons', timestamps: false });

module.exports = Lesson;
