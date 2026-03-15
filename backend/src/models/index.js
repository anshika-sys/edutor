const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Lesson = require('./Lesson');
const Enrollment = require('./Enrollment');
const LessonProgress = require('./LessonProgress');

// Associations
User.hasMany(Enrollment, { foreignKey: 'user_id' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });

Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(Lesson, { foreignKey: 'course_id' });
Lesson.belongsTo(Course, { foreignKey: 'course_id' });

User.hasMany(LessonProgress, { foreignKey: 'user_id' });
LessonProgress.belongsTo(User, { foreignKey: 'user_id' });

Lesson.hasMany(LessonProgress, { foreignKey: 'lesson_id' });
LessonProgress.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = { sequelize, User, Course, Lesson, Enrollment, LessonProgress };
