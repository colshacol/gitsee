var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('./index.html', { root: `./` })
})

router.get('/*', (req, res, next) => {
  res.sendFile('./index.html', { root: `./` });
})

module.exports = router;
