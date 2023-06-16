const passport = require('passport');

function authenticate(req, res, next) {
    passport.authenticate('jwt', { session: false })(req,res,next);
}

module.exports = { authenticate };