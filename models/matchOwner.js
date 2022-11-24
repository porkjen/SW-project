var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

//find and list avaliable online driver from mongoDB, sort by having a helmet
module.exports = async function matchOwner(matchData){

    let result = {};
    
    MongoClient.connect(url,  {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("test").find({ identity: "owner", status: "online", location: matchData.area },
        { projection: { account: 0, name: 1, phone: 1, email: 0, gender: 1, licensePlateNum: 1, 
          location: 1, workingTime: 1, helmet: 1, other: 1, status: 1, identity: 0 } }).toArray(function (err, result) {

          if (err)
            throw err;
          result.sort(function (a, b) {
            return a.helmet > b.helmet;
          });

          console.log(result);
          db.close();
        });
    });

    return result;

  }
