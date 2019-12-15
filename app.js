var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
var rfs = require('rotating-file-stream');
var session = require('express-session');
var sessionStore = require('session-file-store')(session);
require('dotenv').config();
var passport = require('passport');
var passportConfig = require('./passport');
var flash = require('connect-flash');
var { sequelize } = require('./models');

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false
  }
  /* store: new sessionStore() */
}));
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());


/* Morgan 셋팅 */
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});
app.use(logger('combined', { stream: accessLogStream }));

/* Method-Override 셋팅 */
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var authRouter = require('./routes/auth');
var postRouter = require('./routes/post');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
