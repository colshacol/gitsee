var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('> DOCUMENT REQUEST index.html');
  res.sendFile('./index.html', { root: `./` });
});

module.exports = router;
