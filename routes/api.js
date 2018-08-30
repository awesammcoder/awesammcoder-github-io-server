var express = require('express');
var router = express.Router();
var db = require('../lib/firebase');

var config = {
  type: 'api',
  version: 1.0,
  author: 'awesammcoder',
  timestamp: +new Date(),
  status: true
};

router.get('/', function(req, res, next) {
  res.render('index', {title: 'awesammcoder.github.io'});
});

router.get('/resume', function(req, res, next) {
  res.json(db.get('resume'));
});


module.exports = router;