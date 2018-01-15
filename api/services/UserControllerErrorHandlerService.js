module.exports = {
  create: (err, req, res) => {
    sails.log.error("UserControllerErrorHandlerService.create:", err.details)
    if(err.details.includes('A record with that `email` already exists')) {
      return res.conflict({
        status: 409,
        error: 'Email already exists',
      })
    }
    return res.badRequest({
      status: 400,
      error: 'Some parameters are invalid or empty'
    })
  },
  auth: (err, req, res) => {
    sails.log.error("UserControllerErrorHandlerService.auth:", err.details || err.message || err || 'Attempt to login failed')
    return res.unauthorized({
      status: 401,
      error: 'Invalid email/password combination'
    })
  },
  addContact: (err, req, res) => {
    sails.log.error("UserControllerErrorHandlerService.addContact:", err.details || err.message || err)
    return res.badRequest({
      status: 400,
      error: err.details || err.message || 'Bad request'
    })
  }
}
