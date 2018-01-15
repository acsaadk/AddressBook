const JWT = require('jsonwebtoken')

/**
 * User.js
 *
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'String',
      required: true,
      notNull: true,
      minLength: 4
    },
    lastName: {
      type: 'String',
      required: true,
      notNull: true,
      minLength: 2
    },
    email: {
      type: 'String',
      required: true,
      unique: true,
      notNull: true,
      email: true
    },
    password: {
      type: 'String',
      required: true,
      notNull: true,
      minLength: 4
    },

    addContact: function(contact) {
      return FirebaseService.addContact(this, contact)
      .then(() => contact)
    },

    generateJWT: function() {
      return FirebaseService.generateCustomToken(this)
      .then(token => {
        return {
          bearer: JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            sub: `${this.id}`,
            data: {
              thirdPartyTokens: {
                firebase: token
              }
            }
          }, process.env.JWT_SECRET)
        }
      })
    }
  },

  findByEmailAndPassword: function(email, password) {
    return User.findOne({ email, password })
    .then(user => user || Promise.reject(new Error('user not found')))
  },

  findOneById: function(id) {
    userId = (typeof(id) === "string" && parseInt(id)) || id
    return User.findOne({ id: userId })
    .then(user => user || Promise.reject(new Error('user not found')))
  }
}
