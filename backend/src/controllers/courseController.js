const { Course, Lesson, Enrollment, User } = require('../models');
const { Op } = require('sequelize');

// GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const where = {};
    if (category) where.category = category;
    if (search) where.title = { [Op.like]: `%${search}%` };

    const courses = await Course.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: Lesson, order: [['lesson_order', 'ASC']] }],
    });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/courses (admin/teacher)
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/courses/stats
const getStats = async (req, res) => {
  try {
    const totalStudents = await User.count({ where: { role: 'Student' } });
    const totalCourses = await Course.count();
    const totalTeachers = await User.count({ where: { role: 'Teacher' } });
    const completedCourses = await Enrollment.count({ where: { progress_percentage: 100 } });
    res.json({ totalStudents, totalCourses, totalTeachers, completedCourses });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, getStats };
