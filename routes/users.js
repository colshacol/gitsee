//
const router = require('express').Router()
const mongo = require('mongojs')

const db = mongo(
  'mongodb://gitsee:MarleyMC__14@ds019746.mlab.com:19746/gitsee',
  ['users']
)

router.get('/login/:username/:password', login)
router.get('/register', register)
router.get('/count', countUsers)
router.get('/simple', sendUsersSimple)

module.exports = router;

function login(req, res, next) {
  const username = req.params.username;
  const password = req.params.password;

  // Find users with provided username.
  db.users.find({username: username}, (err, doc) => {
    // If there are none, alert the user.
    if (!doc.length) {
      console.log('No user with username: ' + username)
      res.send('No user with that username.')
    }

    // If there are multiple, scratch your head. "Huh?"
    if (doc.length > 1) {
      console.log('That is weird. Multiple users: ' + username)
      res.send('Weird... there are ' + docs.length + ' of you.')
    }

    // If there is only one and the passwords match, send the
    // appropriate data to log the user in.
    if (doc.length === 1 && doc[0].password === password) {
      const userData = doc[0]
      userData.password = '*'
      res.send({
        status: 'success',
        userData: userData
      })
    }
  })
}

function register(req, res, next) {

}

function countUsers(req, res, next) {

}

function sendUsersSimple(req, res, next) {

}
