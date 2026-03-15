const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, getStats } = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.get('/stats', getStats);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', protect, createCourse);

module.exports = router;
