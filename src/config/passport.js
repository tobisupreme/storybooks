const GoogleStrategy = require('passport-google-oauth20').Strategy
// const mongoose = require('mongoose')
const User = require('../models/User')
const CONFIG = require('../config/config')

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CONFIG.GOOGLE_CLIENT_ID,
        clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
        callbackURL: CONFIG.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile._json.sub,
          displayName: profile._json.name,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          image: profile._json.picture,
        }

        try {
          let user = await User.findOne({ googleId: profile._json.id })

          if (user) {
            return done(null, user)
          }

          user = await User.create(newUser)
          return done(null, user)
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, { id: user.id, username: user.username, name: user.name })
    })
  })

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
      return cb(null, user)
    })
  })
}
