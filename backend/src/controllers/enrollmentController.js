const { Enrollment, Course, Lesson, LessonProgress } = require('../models');

// POST /api/buy-course
const buyCourse = async (req, res) => {
  try {
    const { course_id } = req.body;
    const user_id = req.user.id;

    const existing = await Enrollment.findOne({ where: { user_id, course_id } });
    if (existing) return res.status(400).json({ message: 'Already enrolled in this course' });

    const course = await Course.findByPk(course_id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = await Enrollment.create({ user_id, course_id });
    res.status(201).json({
      message: 'Payment Successful. Course added to your learning.',
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/my-courses
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Course }],
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/update-progress
const updateProgress = async (req, res) => {
  try {
    const { lesson_id, course_id } = req.body;
    const user_id = req.user.id;

    // Mark lesson as completed
    const [progress] = await LessonProgress.findOrCreate({
      where: { user_id, lesson_id },
      defaults: { completed: true, completed_at: new Date() },
    });
    if (!progress.completed) {
      progress.completed = true;
      progress.completed_at = new Date();
      await progress.save();
    }

    // Recalculate overall course progress
    const totalLessons = await Lesson.count({ where: { course_id } });
    const completedLessons = await LessonProgress.count({
      where: { user_id, completed: true },
      include: [{ model: Lesson, where: { course_id } }],
    });

    const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    await Enrollment.update(
      { progress_percentage: percentage.toFixed(2) },
      { where: { user_id, course_id } }
    );

    res.json({ message: 'Progress updated', progress_percentage: percentage.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/course-progress/:course_id
const getCourseProgress = async (req, res) => {
  try {
    const { course_id } = req.params;
    const user_id = req.user.id;

    const enrollment = await Enrollment.findOne({ where: { user_id, course_id } });
    if (!enrollment) return res.status(403).json({ message: 'Not enrolled in this course' });

    const lessons = await Lesson.findAll({ where: { course_id }, order: [['lesson_order', 'ASC']] });
    const progressRecords = await LessonProgress.findAll({ where: { user_id } });
    const completedIds = progressRecords.filter(p => p.completed).map(p => p.lesson_id);

    res.json({
      lessons,
      completedIds,
      progress_percentage: enrollment.progress_percentage,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { buyCourse, getMyCourses, updateProgress, getCourseProgress };
