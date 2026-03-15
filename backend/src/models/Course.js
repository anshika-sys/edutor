const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.ENUM(
    'Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems',
    'Computer Networks', 'Cloud Computing', 'Machine Learning', 'Artificial Intelligence',
    'Web Development', 'System Design', 'Cyber Security'
  ), allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  original_price: { type: DataTypes.DECIMAL(10, 2) },
  rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0 },
  thumbnail_url: { type: DataTypes.STRING(500) },
  youtube_playlist_id: { type: DataTypes.STRING(100) },
  total_hours: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  total_lessons: { type: DataTypes.INTEGER, defaultValue: 0 },
  instructor: { type: DataTypes.STRING(100) },
}, { tableName: 'courses', timestamps: true, createdAt: 'created_at', updatedAt: false });

module.exports = Course;
