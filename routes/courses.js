const express = require('express')
const router = express.Router()

const CourseController = require('../controllers/CourseController')
const CourseValidator = require('../controllers/CourseValidator')

//UI Routes
router.get('/listCourses', CourseController.listCourses)
router.get('/createCourse', CourseController.createCourse)
router.get('/updateCourse/:id', CourseController.updateCourse)
router.get('/studentCourses', CourseController.studentCourses)

//Process
router.post('/createCourse', CourseValidator.createCourseValidator, CourseController.createCourseProcess)
router.post('/updateCourse/:id', CourseController.updateCourseProcess)
router.get('/deleteCourse/:id', CourseController.deleteCourse)

module.exports = router