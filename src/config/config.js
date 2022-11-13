require('dotenv').config()

const PORT = process.env.PORT
const DBURI = process.env.NODE_ENV === 'test' ? process.env.TEST_DBURI : process.env.DBURI

module.exports = {
  PORT,
  DBURI,
}
