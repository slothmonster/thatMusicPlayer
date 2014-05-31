var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('index req ', req.session.passport.user);
  if(!req.session.passport.user){
    res.redirect('/login');
  }
  res.render('index', { title: 'Adam\'s music player' });
});

module.exports = router;
