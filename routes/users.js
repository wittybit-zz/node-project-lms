const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

//UI Routes
router.get('/login', UserController.loginForm)
router.get('/editProfile/:id', UserController.editProfile)
router.get('/dashboard/:id', UserController.userDashboard)

//Process
router.post('/login', UserController.loginProcess)
router.post('/register', UserController.registerProcess)
router.post('/changePassword/:id', UserController.changePasswordProcess)
router.post('/editProfile/:id', UserController.editProfileProcess)

module.exports = router