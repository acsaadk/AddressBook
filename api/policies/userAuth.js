const JWT = require('jsonwebtoken')

module.exports = function(req, res, next) {
  try {
    const authorization = req.headers['Authorization'] || req.headers['authorization']
    if(!authorization) {
      sails.log.error('UserAuth:', 'Missing `Authorization` header')
      return res.unauthorized({
        status: 401,
        error: 'Missing `Authorization header`'
      })
    }
    const token = authorization.split(' ')[1]
    var decoded = JWT.verify(token, process.env.JWT_SECRET)
    return User.findOneById(decoded.sub)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => UserControllerErrorHandlerService.addContact(err, req, res))
  } catch(err) {
    sails.log.error('UserAuth:', err)
    return res.unauthorized({
      status: 401,
      error: err.message
    })
  }
}
