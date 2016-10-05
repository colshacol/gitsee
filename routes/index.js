var express = require('express');
var router = express.Router();
const { reqLog, log } = require('../bin/colfun.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`Path requested: ${res.url}`);
  res.sendFile('./index.html', { root: `./` });
})

module.exports = router;
