const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

//UI Routes
router.get('/login', UserController.loginForm)
router.get('/editProfile', (req, res) => res.send('List Courses Works!'))
router.get('/dashboard', UserController.userDashboard)

//Process
router.post('/login', UserController.loginProcess)
router.post('/register', UserController.registerProcess)
router.post('/changePassword', (req, res) => res.send('List Courses Works!'))
router.post('/editProfile', (req, res) => res.send('List Courses Works!'))

module.exports = router