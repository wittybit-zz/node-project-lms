require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

mongoose.set('useFindAndModify', false);

const courseRouter = require('./routes/courses')
const userRouter = require('./routes/users')

mongoose.connect(
    process.env.CONNSRV,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('DB Connected!')
)


const app = express()

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}

app.use(session(sess))

app.set('view engine', 'ejs')
app.set('views', 'views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/courses', courseRouter)
app.use('/', userRouter)

module.exports = app