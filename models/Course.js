const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, default: 0 },
    photo: { type: String }
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course