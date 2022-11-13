/**
 * Module dependencies
 */
const http = require('http')
const app = require('./src/app')
const CONFIG = require('./src/config/config')

// create server
const server = http.createServer(app)

// listen
server.listen(CONFIG.PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${CONFIG.PORT}`))
