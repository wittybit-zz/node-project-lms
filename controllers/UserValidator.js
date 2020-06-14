exports.changePasswordValidator = (req, res, next) => {
    const { password, c_password } = req.body
    let errors = {}

    if(password === '') errors.password = 'Password cannot be blank'
    if(c_password === '') errors.c_password = 'Confirm Password field cannot be blank'
    if(password.length < 8) errors.length = 'Password has to at least be 8 characters long'
    if(password != c_password) errors.match = 'Passwords must match'
    
    if(Object.keys(errors).length === 0) {
        next()    
    } else {
        req.session.errors = errors
        res.redirect(`/changePassword/${req.params.id}`)   
    }
}