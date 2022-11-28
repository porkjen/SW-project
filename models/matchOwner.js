var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/signData";

//find and list avaliable online driver from mongoDB, sort by having a helmet
module.exports = async function matchOwner(matchData){

    let result = {};
    
    return new Promise (resolve=>{MongoClient.connect(url).then((client) => {

      const connect = client.db("signData");
    
      // Connect to collection
      const collection = connect
              .collection("userList");
    
      // Fetching the records having 
      // name as saini
      collection.find({ identity: "owner", status: "online", "area.2":"1" })
          .toArray().then((ans) => {
              console.log(ans);
              resolve(ans);
          });
          
  }).catch((err) => {
    
      // Printing the error message
      console.log(err.Message);
  })}
  )

  }
