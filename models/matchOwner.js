var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

//find and list avaliable online driver from mongoDB, sort by having a helmet
module.exports = async function matchOwner(matchData){

    let result = {};
    
    return new Promise (resolve=>{MongoClient.connect(url).then((client) => {

<<<<<<< HEAD
      const connect = client.db("mydb");
    
      // Connect to collection
      const collection = connect.collection("test");
    
      // Fetching the records having //"area":matchData.area if needed
      collection.find({ identity: "owner", status: "online"})
          .toArray().then((ans) => {
              console.log(ans);
              resolve(ans);
          });
=======
        const connect = client.db("mydb");

        // Connect to collection
        const collection = connect.collection("test");

        // Fetching the records having //"area":matchData.area if needed
        collection.find({ identity: "owner", status: "online"}).toArray()
        .then((result) => {
            console.log("[succ] succ to find owners online.");
            resolve(result);
        });
>>>>>>> 081cd708c9d0f535318c9e7b8cf874dfd08fb3c3
          
    }).catch((err) => {
            console.log(err.Message);
        })
    })

  }
