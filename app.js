let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let config = require('./config/_config');
let bodyParser = require('body-parser');

let authorizeAdminRouter = require('./routes/admin/authorize');
let indexRouter = require('./routes/index');
let session = require('express-session');

let app = express();
app.use(bodyParser());
let adminRouter = require('./routes/admin/adminPanel');
let adminLoginRouter = require('./routes/admin/login');
let adminCustomersRouter = require('./routes/admin/customers');
let adminWallOfFameRouter = require('./routes/admin/wallOfFame');
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized : true,
  resave : true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/login', adminLoginRouter);
app.use('/admin*', authorizeAdminRouter);
app.use('/admin', adminRouter);
app.use('/admin/customers', adminCustomersRouter);
app.use('/admin/wall-of-fame', adminWallOfFameRouter);
app.use('/', indexRouter);
app.use('/form-sending', indexRouter);
app.use('/static', express.static('public'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;
