// /config/ensureLoggedIn.js
module.exports = (req, res, next) => {
  console.log('req', req)
    if (!req.user) return res.status(401).json('Unauthorized')
    next()
  }
   