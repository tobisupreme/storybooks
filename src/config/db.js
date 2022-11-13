const mongoose = require('mongoose')

const connectDb = async (URI) => {
  try {
    const conn = await mongoose.connect(URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

module.exports = connectDb
