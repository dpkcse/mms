var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var expressValidator = require('express-validator');
var expressSession = require('express-session')({
  secret: require('./config/keys').secret,
  resave: true,
  saveUninitialized: true
});
var socketIO = require('socket.io');
var sharedsession = require("express-socket.io-session");

//DB config
const db = require('./config/keys').mongoURI;
//Mngo DB connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(()=>{console.log("DB connected")})
  .catch((err)=>{console.log("DB Error",err)});

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');

var app = express();

app.use(logger('dev'));
app.use(expressSession);
app.use(express.static("public"));
// Socket.io

var io = socketIO();
app.io = io;
io.use(sharedsession(expressSession, {
  autoSave: true
}));
io.of('/namespace').use(sharedsession(expressSession, {
  autoSave: true
}));
require('./socket/socket.js')(io);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/profile', profileRouter);

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
