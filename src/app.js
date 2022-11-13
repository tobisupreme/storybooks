const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const indexRouter = require('./routes/index')

const app = express()

// Morgan: use logger in development mode only
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : true

// Handlebars: view engine setup
app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Statif folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRouter)

module.exports = app
