const bcrypt = require('bcryptjs')
const User = require('../models/User')

var logged_in = false
var mail = null

exports.loginForm = (req, res) => {
    const data = {
        title: 'LMS | Login'
    }
    res.render('login', data)
}

exports.loginProcess = (req, res) => {
    const { email, password } = req.body
    
    
    User.findOne({ email })
        .then(user => { //user = new User()
            if(user) {
                const valid = bcrypt.compareSync(password, user.password)
                
                if(valid && user.isInstructor == true) {
                    logged_in = true;
                    mail = user.email
                    res.redirect('/courses/listCourses')
                    //res.render('/courses/listCourses')
                }
                else if(valid && user.isInstructor == false)
                {
                    logged_in = true;
                    mail = user.email
                    res.redirect('courses/studentCourses')
                } else {
                    console.log('Not Valid Password')
                    res.redirect('/login')
                }
            } else {
                console.log('No User')
                res.redirect('/login')
            }
        })
        .catch(err => {
            console.log('Something went wrong')
            res.redirect('/login')
        })
}

exports.registerProcess = (req, res) => {
    const { name, email, password, mode } = req.body
    
    const user = new User()
    
    user.name = name
    user.email = email
    if(mode == 'student')
        user.isInstructor = false
    else
        user.isInstructor = true
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    
    user.password = hash
    
    user.save()
        .then(() => res.redirect('/login'))
        .catch(err => res.send(err))
}

exports.userDashboard = (req, res) => {
    User.findOne(mail)
        .then(user => {
                const title = 'LMS | Dashboard'
                const user1 = user
            // console.log('///////////////////////////////////////////////////////')
            //console.log(data)
            res.render('dashboard', {title:title , user: user1})
        })
        .catch(err => {
            res.json(err)
        })
}