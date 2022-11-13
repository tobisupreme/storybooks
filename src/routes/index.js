const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

/**
 * @description Login/Landing page
 * @route GET /
 */

router.route('/').get(ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' })
})

/**
 * @description Dashboard
 * @route GET /dashboard
 */

router.route('/dashboard').get(ensureAuth, (req, res) => {
  console.log(req.user)
  res.render('dashboard')
})

module.exports = router
