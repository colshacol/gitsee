var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('./public/scripts/webpack.js');
});

module.exports = router;
