const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/')
}

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard')
  }
  return next()
}

module.exports = {
  ensureAuth,
  ensureGuest,
}
