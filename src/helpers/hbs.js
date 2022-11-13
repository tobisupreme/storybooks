const moment = require('moment')

const formatDate = (date, format) => {
  return moment(date).format(format)
}

const truncate = (str, len) => {
  if (str.length > len && str.length > 0) {
    let new_str = str + ' '
    new_str = str.substr(0, len)
    new_str = str.substr(0, new_str.lastIndexOf(' '))
    new_str = new_str.length > 0 ? new_str : str.substr(0, len)
    return new_str + '...'
  }
  return str
}

const stripTags = (str) => {
  return str.replace(/<(?:.|\n|)*?>/gm, '')
}

const editIcon = (storyUser, authenticatedUser, storyId, floating = true) => {
  if (storyUser.toString() === authenticatedUser.toString()) {
    if (floating) {
      return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit small"></i></a>`
    }
    return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit small"></i>`
  }

  return ''
}

module.exports = {
  formatDate,
  truncate,
  stripTags,
  editIcon,
}
