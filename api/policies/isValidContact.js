module.exports = function(req, res, next) {
  const { firstName, lastName, nickname, phones } = req.body
  if(!firstName || firstName === "") {
    return UserControllerErrorHandlerService.addContact(new Error('Fist name is missing'), req, res)
  }
  if(!lastName || lastName === "") {
    return UserControllerErrorHandlerService.addContact(new Error('Last name is missing'), req, res)
  }
  if(nickname && nickname === "") {
    return UserControllerErrorHandlerService.addContact(new Error('Nick name is empty'), req, res)
  }
  if(!phones || phones.length < 1) {
    return UserControllerErrorHandlerService.addContact(new Error('It must has one phone at least'), req, res)
  }
  next()
}
