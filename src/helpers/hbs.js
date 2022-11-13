const moment = require('moment')

const formatDate = (date, format) => {
  return moment(date).format(format)
}

module.exports = {
  formatDate,
}
