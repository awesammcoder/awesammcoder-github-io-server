var express = require('express');
var router = express.Router();

var config = {
  type: 'api',
  version: 1.0,
  author: 'awesammcoder',
  timestamp: +new Date(),
  status: true
};

router.get('/', function(req, res, next) {
  res.json(config);
});

module.exports = router;