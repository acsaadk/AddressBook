/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		User.create(req.body)
		.then(user => user.generateJWT())
		.then(jwt => res.created(jwt))
		.catch(err => UserControllerErrorHandlerService.create(err, req, res))
	},
	auth: function(req, res) {
		const { email, password } = req.body
		User.findByEmailAndPassword(email, password)
		.then(user => user.generateJWT())
		.then(jwt => res.created(jwt))
		.catch(err => UserControllerErrorHandlerService.auth(err, req, res))
	},
	addContact: function(req, res) {
		req.user.addContact(req.body)
		.then(contact => res.created(contact))
		.catch(err => UserControllerErrorHandlerService.addContact(err, req, res))
	}
};
