const router = require('express').Router()
const { ensureAuth } = require('../middleware/auth')
const Story = require('../models/Story')

/**
 * @description Show add stories page
 * @route GET /stories/add
 */
router.route('/add').get(ensureAuth, (req, res) => {
  res.render('stories/add')
})

/**
 * @description Create new story
 * @route POST /stories
 */
router.route('/').post(ensureAuth, async (req, res) => {
  const { title, body, status } = req.body
  try {
    const newStory = {
      title,
      body,
      status,
      user: req.user.id
    }
    await Story.create(newStory)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
