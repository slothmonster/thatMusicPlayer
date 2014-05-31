var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('inside the login file');

  res.render('login', { title: 'Log In' });

});

module.exports = router;