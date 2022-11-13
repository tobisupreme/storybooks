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
 * @description Show all stories
 * @route GET /stories
 */
router.route('/').get(ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' }).populate('user').sort({ createdAt: -1 }).lean()
    res.render('stories/index', { stories })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
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
    }
    await Story.create(newStory)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
