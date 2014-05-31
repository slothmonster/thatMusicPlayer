var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var BeatsStrategy = require('passport-beatsmusic').Strategy;
var env = require('../env_config');

//require in all the routes
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"slowmagic"}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

//passport-beatsmusic implementation
passport.use(new BeatsStrategy({
    clientID: env.BEATS_API_KEY,
    clientSecret: env.BEATS_SECRET,
    callbackURL: env.BEATS_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);

    done(null, profile);

  // User.findOrCreate(..., function (err, user) {
  //   return done(err, user);
  // });
}
));

passport.serializeUser(function(user, done) {
    // console.log('serializer log', arguments);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    // console.log('deserializer log', arguments);
  done(null, obj);
});

app.get('/auth/beatsmusic', passport.authenticate('beatsmusic'));

app.get('/auth/beatsmusic/callback',
  passport.authenticate('beatsmusic', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
