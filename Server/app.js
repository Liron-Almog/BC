var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/user');
var productsRouter = require('./routes/products');
var promosRouter = require('./routes/promos');
var supermarketsRouter = require('./routes/supermarkets');
var chainsRouter = require('./routes/chains');
var CartsRouter = require('./routes/Carts');
var FeedbackRouter = require('./routes/feedback');
var listExistRouter = require('./routes/listExist');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/products', productsRouter),
    app.use('/promos', promosRouter),
    app.use ('/supermarkets', supermarketsRouter),
    app.use('/chains', chainsRouter),
    app.use('/Carts', CartsRouter),
    app.use('/feedback', FeedbackRouter),
    app.use('/listExist', listExistRouter),


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

