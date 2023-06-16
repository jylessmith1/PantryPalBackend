var createError = require('http-errors');
var express = require('express');
let cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
require('./config/passport')(passport);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let shoppingListRouter = require('./routes/shopping_list');
let inventoryRouter = require('./routes/inventory');
const authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(cors())


//List of route endpoints for our API
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shoppinglist', shoppingListRouter)
app.use('/inventory', inventoryRouter )
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
app.listen(() => {
  console.log(`server running`)
})

module.exports = app;
