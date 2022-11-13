require('dotenv').config()

const PORT = process.env.PORT
const DBURI = process.env.NODE_ENV === 'test' ? process.env.TEST_DBURI : process.env.DBURI
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL
const SECRET = process.env.APP_SECRET

module.exports = {
  PORT,
  DBURI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  SECRET,
}
