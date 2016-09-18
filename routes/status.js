const router = require('express').Router(),
  twilioSid = 'ACfed423fb578e54a1d55bdea4d32445d5',
  twilioToken = '3b6c37a4e0c1828261502fd3565eadb2',
  twilio = require('twilio')(twilioSid, twilioToken)

router.get('/', function(req, res, next) {
  twilio.messages.create({
    to: "8178943210",
  	from: "+12544346051",
  	body: "Here is the status."
  }, (err, msg) => {
  	console.log(msg.sid)
    res.send('STATUS SENT')
  })
})

module.exports = router;
