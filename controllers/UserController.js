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
                    res.redirect(`/dashboard/${user._id}`)
                    //res.render('/courses/listCourses')
                }
                else if(valid && user.isInstructor == false)
                {
                    logged_in = true;
                    mail = user.email
                    res.redirect(`/dashboard/${user._id}`)
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
    User.findOne({_id: req.params.id})
        .then(user => {
                const title = 'LMS | Dashboard'
                const user1 = user
            // console.log('///////////////////////////////////////////////////////')
            //console.log(data)
            console.log("USER DASHBOARD DATA IS",user)
            res.render('dashboard', {title:title , user: user1})
        })
        .catch(err => {
            res.json(err)
        })
}

exports.editProfile = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {
                const title = 'LMS | Edit Profile'
                const user1 = user
            // console.log('///////////////////////////////////////////////////////')
            //console.log(data)
            console.log("EDIT DASHBOARD DATA IS",user)
            res.render('editProfile', {title:title , user: user1}) //errors: req.session.errors
        })
        .catch(err => {
            res.json(err)
        })
}

exports.editProfileProcess = (req, res) => {
    const myUserData = {
        name : req.body.name,
        email : req.body.email
    }
    User.findOneAndUpdate({_id: req.params.id}, myUserData, function(err, course){
        if(err)
            return next(err)
        res.redirect(`/dashboard/${req.params.id}`)
        console.log('entry',req.params.id,myUserData)
    })
}

exports.navResolver = (req, res) => {
    User.findOne(req.params.id)
        .then(user => {
            const data = {
                title: 'abc',
                user
            }
            if(user.isInstructor == true){
                const navLink = `/listCourses`
                res.redirect('/listCourses', navLink) //goes to listCourses and 
            }else{
                const navLink = '/studentCourses'
                res.redirect = ('/studentCourses', navLink)
            }
        })
}

exports.changePasswordProcess = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    
    //const user = new User()
    const user = User.findOneAndUpdate({_id: req.params.id},{password: hash},function(err, user){
        if(err)
            return next(err)
        res.redirect(`/dashboard/${req.params.id}`)
        console.log('entry',req.params.id, req.body.password, hash)
    })
}
