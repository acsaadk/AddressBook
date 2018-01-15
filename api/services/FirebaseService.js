const Firebase = require('firebase-admin')

Firebase.initializeApp({
  credential: Firebase.credential.cert({
    type: 'service_account',
    project_id: process.env.FB_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FB_CLIENT_CERT_URL
  }),
  databaseURL: process.env.FB_DB_URL
})

const db = Firebase.database()
const users = db.ref('users')

module.exports = {
  generateCustomToken: function(user) {
    return Firebase.auth().createCustomToken(`${user.id}`)
  },
  addContact: function(user, contact) {
    return users.child(`${user.id}/contacts`).push(contact)
  }
}
