

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const key = require('../config/keys')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key.jwtSecret
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.userId)
          .select('email')

        if (user) {
          return done(null, user)
        }

        return done(null, false)
      } catch (error) {
        console.error('JWT strategy error:', error)
        return done(error, false)
      }
    })
  )
}
