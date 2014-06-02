var express = require('express');
var router = express.Router();
// var env = require('../../env_coanfig') || null;
var request = require('request');

var baseURL = 'https://partner.api.beatsmusic.com/v1/api';

router.get('/search', function(req, res) {

  //submit request to Beats
  var options = {
    url: baseURL +'/search?q=' + encodeURIComponent(req.query.search) + '&type=track&filters=streamable:true&client_id=' + (process.env.BEATS_API_KEY || env.BEATS_API_KEY),
    headers:{
    }
  };
  request(options, function(err, response, body){
    if(err) { res.send(500, err); }
    res.send(200, body);
  });
});

module.exports = router;



