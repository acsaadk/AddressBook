const Firebase = require('firebase-admin')

Firebase.initializeApp({
  credential: Firebase.credential.cert({
    "type": "service_account",
    "project_id": "address-book-44a6e",
    "private_key_id": "2aec0930622b2bbb0dc145d4de1246558d1b335d",
    "private_key": `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq9ynnRPX4QbQW\nNgekNrgXjnUaXzNmoaQAAuBUCN0bG6JdQ4IJ9/le5PuEBAgt8by3L7A0cCBn+y/h\ngycSnA8AwHrai9Xg4VYfslDT/D7VhYqtFqAY4ZljYBDhBLHp4aHTEBt8sl+cWg/e\nC0rf7cfb10Wtmoe4L2i5ydofuA7KI0R2X+srAHvyNG0Y2ab8EFqNpxMzqaPp45No\nmoQ0g8DvPlZRea834xFGF9YEYmWMlKxnQTk6+q7AeX/rkPpBVdMm+I11Rsi7goWP\ntXy8oVZ20VQnGAvERH4MN7p8XiT0LjA7mF4GRRlGbd+L8TMkMgwEmVc5JcHKOD+H\nahNjvPslAgMBAAECggEAAnXB/ZjpbSQM4lDutTcwWO5s0u9RvwVOZc2kyrDB9bTl\nFjB1e4084lerItAoCfkzfPNLtsVyQezEWJtZgZQLRzh9zA09C5pScexP62zyvoHI\naAsuTI1adqqYM5Sstq/Pc0kFDDtI0ugc2FYTQruaJ5imYQQbNdRAzoOQBurQE6p+\nOOnrWgQdjtlH2pkehj8iAFR3Js4CtAAXKfjrd2G9NwohhlgtSajpa2iaLFEf0MMK\n1QmPWXVOSZCz006vuxZU9PTddPJ+S53iAULvxfckq4qV/+Ap1rdEtMXmg66nHKzX\nXtmJAkFmUcqQRemqItsA7Dg9+9/+XZCXwv6vyYD/9QKBgQDWt0AMMGRu28YwpPXn\nSdqetJa56T+vM+nq4Qa2Aze95bneMqql5yRVYavmxbtLbfT/iHpYaicg4dDfzo1M\n4gfQ8pHz9NDOg0ud7JZN8R9CKRSkzmw8+UtB/barInj9DRYspjSUNOcDvsxBkHMM\nP9aw36r6GtHnXutXNjPEAPtOWwKBgQDL1m7MQ8ffwtxDiz5jS6+O7dc1Yfz0+rbU\nw0dm81hWcJVrO2T9ajWeNvGdApOFHH2UanrCrVtcOZryGIglbNyFP5Rd1BafyfKY\nmV1XRWwwWeJF458gRJCaPzRtH3ubu6uu97Bh5m586NnLdfHJXR/2o2Sr0GuteW2q\nzffuJXYUfwKBgGUrs2IK60fRBnGlSLjSc9CUBvFSlk9XhsDFhwP8QCeaNxobhYzm\nfJg+jWEPilDgXrCI/hzq58T2ohTSnoG7fzNVGLB6imjENL0U3T2cf74M3U1KdnXE\ngVF22ruIYrnZkLk5F00+IBwDqvq5tXvwGJj+yvFN8dmzP/C3+WxBiihBAoGAK9Lc\nW1ovPLJePL9RGHQLOIV2AWohwmGssS2SylWDJoJp/XX1jm4pPOy/IWyOXs3zSddi\nsTwoKjnQUEBp9PHkr1kuAsY4Xv5CBADlCoBIdFS+yxvW+E8Fb8Qq91MPdjnw/VsP\nNt0d4AkH2jBvXUWCO7qBSFc070TuCQzjQvYW3u0CgYEAhvBl4M/6yuKgn/CFuoNb\nR+XcfqMsQECpx3AIZ+cla7ZW2ohqlhihHUtVkRIicIK+7kQANzBvuMACvUp8Than\n1NRW4ZWWobFI7V1t0rxDsPvdmAubjJLkX2R1xPaUQ3x/H6NK3z6BNw8xmJVG2RMw\n29RPTZgUYDNUK16quiULRlU=\n-----END PRIVATE KEY-----\n`,
    "client_email": "firebase-adminsdk-rufb3@address-book-44a6e.iam.gserviceaccount.com",
    "client_id": "113779323072332347988",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rufb3%40address-book-44a6e.iam.gserviceaccount.com"
  }),
  databaseURL: 'https://address-book-44a6e.firebaseio.com'
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
