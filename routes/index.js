var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();

/*********** 在express上新增的 --(頭)  ************/

router.get('/collectEnrollData', function(req, res) {
  var account  = req.query.account;
  var password = req.query.password;
  var email    = req.query.email;

  console.log('enroll test!');

  //connect with mongodb
  MongoClient.connect("mongodb://localhost:27017/signData", function(err,db){
    if(err){
      console.log("連線失敗");   //debug(跟mongodb的連線失敗)
      throw err;  
    }
    console.log("連線成功");     //debug(跟mongodb的連線成功)

    var dbo = db.db('signData');
    var insertData = {
      account:  account,
      password: password,
      email: email
    };
    dbo.collection('userList').insert(insertData, function(err, res){
      if(err){
        console.log("寫入失敗")   //debug(確認是否寫入)
        throw err;
      }
      console.log("寫入成功")  //debug(確認是否寫入)
    })
  })


  res.end();
})
/*********** 在express上新增的 --(尾)  ************/


module.exports = router;
