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
 * @description View story
 * @route GET /stories/:id
 */
router.route('/:id').get(ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('user').lean()

    if (!story) {
      return res.render('error/404')
    }

    res.render('stories/show', { story })
  } catch (err) {
    console.error(err)
    res.render('error/404')
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
      user: req.user.id,
    }
    await Story.create(newStory)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

/**
 * @description Edit story
 * @route PUT /stories/:id
 */
router.route('/:id').put(ensureAuth, async (req, res) => {
  console.log(req.url, 'line 54')
  try {
    let story = await Story.findById(req.params.id).lean()

    if (!story) {
      return res.render('error/404')
    }

    if (story.user.toString() !== req.user.id.toString()) {
      return res.redirect('/stories')
    }

    story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' }).lean()

    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

/**
 * @description Show edit page
 * @route GET /stories/edit/:id
 */
router.route('/edit/:id').get(ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean()

    if (!story) {
      return res.render('error/404')
    }

    if (story.user.toString() !== req.user.id.toString()) {
      return res.redirect('/stories')
    }

    res.render('stories/edit', { story })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

/**
 * @description Delete story
 * @route DELETE /stories/:id
 */
router.route('/:id').delete(ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)

    if (!story) {
      return res.render('error/404')
    }

    if (story.user.toString() !== req.user.id.toString()) {
      return res.redirect('/stories')
    }

    await story.remove()
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
