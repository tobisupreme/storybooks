const passport = require('passport')

const router = require('express').Router()

/**
 * @description Authenticate with Google
 * @route GET /auth/google
 */
router.route('/google').get(passport.authenticate('google', { scope: ['profile'] }))

/**
 * @description Google auth callback
 * @route GET /auth/google/callback
 */
router.route('/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/dashboard',
  })
)

/**
 * @description Logout user
 * @route GET /auth/logout
 */
router.route('/logout').get((req, res) => {
  req.logout(
    res.redirect('/')
  )
})

module.exports = router
