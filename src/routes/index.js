const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

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
router.route('/dashboard').get(ensureAuth, async (req, res) => {
  const { firstName, lastName, image } = req.user
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      firstName,
      lastName,
      image,
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
