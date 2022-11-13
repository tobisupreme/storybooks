/**
 * Module dependencies
 */
const http = require('http')
const app = require('./src/app')
const CONFIG = require('./src/config/config')
const connectDb = require('./src/config/db')

// create server
const server = http.createServer(app)

// start server
server.listen(CONFIG.PORT, async () => {
  // connectDB
  await connectDb(CONFIG.DBURI)
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${CONFIG.PORT}`)
})
