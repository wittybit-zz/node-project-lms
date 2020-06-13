exports.createCourseValidator = (req, res, next) => {
    const { name, description, photo, duration } = req.body
    let errors = {}

    if(name === '') errors.name = 'Name cannot be blank'
    if(description === '') errors.description = 'Description cannot be blank'
    if(photo === '') errors.photo = 'Photo has to have a URL'
    if(duration === '') errors.duration = 'Duration cannot be blank'
    
    if(Object.keys(errors).length === 0) {
        next()    
    } else {
        req.session.errors = errors
        res.redirect('/courses/createCourse')   
    }
}