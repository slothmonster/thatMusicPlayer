var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if(!req.session.passport.user){
    res.redirect('/login');
  } else {
    res.cookie('music', req.session.passport.user.accessToken);
    res.render('layout', { title: 'Adam\'s music player' });
  }
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Adam\'s music player' });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
