
/*********** 在express上新增的 --(頭)  ************/
var MongoClient = require('mongodb').MongoClient;
/*********** 在express上新增的 --(尾)  ************/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
//------------------------------------------------------------------------------------------------------------------------


app.get('/collectSignData', function(req, res, next){ 
    //collectSignData: 送出註冊資料的路由
  var identity = req.query.identity //身分: 車主or乘客
  var name = req.query.name     //姓名
  var email = req.query.email    //帳號(email)
  var key = req.query.key      //密碼

  console.log(name, email)      //debug(確認後端是否收到)
  res.send(JSON.stringify(email));

  MongoClient.connect("mongodb://localhost:27017/signData", function(err,db){
  if(err){
  console.log("連線失敗");   //debug(跟mongodb的連線失敗)
  throw err;
  }
  console.log("連線成功");     //debug(跟mongodb的連線成功)

  var dbo = db.db('signData');
  var insertData = {
  identity: identity,
  name: name,
  email: email,
  key: key
  };
  dbo.collection('userList').insert(insertData, function(err, res){
  if(err){
  console.log("寫入失敗")   //debug(確認是否寫入)
  throw err;
  }
  console.log("寫入成功")  //debug(確認是否寫入)
  })
  })


  res.end()
});
