var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var memberRouter = require('./routes/member');
var usersRouter = require('./routes/users');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


app.get('/v', (req, res) => {
  res.sendFile( __dirname + '/public/mainPage.html');
});

//主畫面到選登入
app.post('/signIn',(req, res) => {
  res.sendFile( __dirname + '/public/SignIn.html');
});

//主畫面到選註冊
app.post('/enter',(req, res) => {
  res.sendFile( __dirname + '/public/cover.html');
});

//登入到選身分
app.post('/login',(req, res) => {
  res.sendFile( __dirname + '/public/chooseIdentity.html');
});

//註冊到選身分 
app.post('/register', (req, res) => {
  res.sendFile( __dirname + '/public/chooseIdentity_main.html');
});

//車主設定個人資訊到登入頁面
app.post('/ownerInfo', (req, res) => {
  res.sendFile( __dirname + '/public/index.html');
});

//選身分到填個人資訊
app.post('/identityInfo', urlencodedParser,(req, res) => {
  console.log(req.body.identity);
  if(req.body.identity=='owner'){
    res.sendFile( __dirname + '/public/ownerInfo.html');
  }
   else{
    res.sendFile( __dirname + '/public/passagerInfo.html');
   }
});

//選身分到主畫面
app.post('/main', urlencodedParser,(req, res) => {
  console.log(req.body.identity);
  if(req.body.identity=='owner'){
    res.sendFile( __dirname + '/public/mainPage.html');
  }
   else{
    res.sendFile( __dirname + '/public/showRider.html');
   }
});

//評分到主畫面
app.post('/rate', (req, res) => {
  res.sendFile( __dirname + '/public/chooseIdentity_main.html');
});

//乘客填個人資訊到登入
app.post('/passengerInfo', (req, res) => {
  res.sendFile( __dirname + '/public/index.html');
});

//車主主畫面修改個人資訊
app.post('/changeOwnerBasic', (req, res) => {
  res.sendFile( __dirname + '/public/mainPage.html');
});

//車主主畫面修改地區
app.post('/changeOwnerLoc', (req, res) => {
  res.sendFile( __dirname + '/public/mainPage.html');
});

//車主主畫面修改時間
app.post('/changeOwnerTime', (req, res) => {
  res.sendFile( __dirname + '/public/mainPage.html');
});


// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', memberRouter);
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
