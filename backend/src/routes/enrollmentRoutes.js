const express = require('express');
const router = express.Router();
const { buyCourse, getMyCourses, updateProgress, getCourseProgress } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.post('/buy-course', protect, buyCourse);
router.get('/my-courses', protect, getMyCourses);
router.post('/update-progress', protect, updateProgress);
router.get('/course-progress/:course_id', protect, getCourseProgress);

module.exports = router;
