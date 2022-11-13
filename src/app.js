const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const CONFIG = require('./config/config')
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

// passport config
require(path.join(__dirname, 'config', 'passport.js'))(passport)

const app = express()

// Morgan: use logger in development mode only
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : true

// Handlebars: view engine setup
app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Sessions middleware
app.use(session({
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: false,
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)

module.exports = app
