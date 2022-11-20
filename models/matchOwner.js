var MongoClient = require('mongodb').MongoClient;

//find and list avaliable online driver from mongoDB, sort by having a helmet
module.exports = function matchOwner(ownerData){

    let result = {};
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("userList").find({identity:"owner", status:"online"},
      {projection: {account:0, name:1, phone:1, gender:1, licensePlateNum:1, workingTime:0, helmet:1, other:1, status:1, identity:0} }).toArray(function(err, result) {

        if (err) throw err;
        result.sort(function(a,b){
          return a.helmet > b.helmet;
        });

        console.log(result);
        db.close();
      });
    });

    return result;

  }