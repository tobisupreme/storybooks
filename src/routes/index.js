const router = require('express').Router()

/**
 * @description Login/Landing page
 * @route GET /
 */

router.route('/').get((req, res) => {
  res.render('login', { layout: 'login' })
})

/**
 * @description Dashboard
 * @route GET /dashboard
 */

router.route('/dashboard').get((req, res) => {
  res.render('dashboard')
})

module.exports = router
