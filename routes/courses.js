const express = require('express')
const router = express.Router()
const Course = require('../models/Course')

const CourseController = require('../controllers/CourseController')
const CourseValidator = require('../controllers/CourseValidator')

//UI Routes
router.get('/listCourses', CourseController.listCourses)
router.get('/listCourses/:n', (req,res)=>{
   
    Course.find()
    .then(courses => {
        const data = {
            title: 'LMS | List of Courses',
            courses
        }
        const user = {
            name: req.params.n,
        }
        const name1=  req.params.n;
        res.render('listCourses', {title: 'LMS | List of Courses', user: user, courses: courses,name:name1})
    })
   
    
} )
router.get('/createCourse/:n', CourseController.createCourse)
router.get('/updateCourse/:id/:n', CourseController.updateCourse)
router.get('/studentCourses/:n', CourseController.studentCourses)
//router.get('/addCourse/:id',(req, res) => res.send('Add course GET works'))
router.get('/courseDetails/:id/:n',CourseController.courseDetails)

//Process
router.post('/createCourse/:n', CourseValidator.createCourseValidator, CourseController.createCourseProcess)
router.post('/updateCourse/:id/:n', CourseController.updateCourseProcess)
router.get('/deleteCourse/:id/:n', CourseController.deleteCourse)

module.exports = router