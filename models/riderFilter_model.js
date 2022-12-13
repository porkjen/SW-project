var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = async function riderFilter(filterData){

    let result = {};
    
    return new Promise((resolve, reject) => {
          MongoClient.connect(connectAddr, function(err, db) {
            if(err){
              console.log(err);
              result.status = "連線失敗"
              result.err = "伺服器錯誤!"
              reject(result);
              return;
            }

          var dbo = db.db("mydb");

          dbo.collection("test").find({
            identity:   "owner",
            status:     "online",
            gender:     filterData.gender,
            helmet:     filterData.helmet
          },{$or: [
            {area:       filterData.area},
            {area:       [filterData.area]}
          ]}).toArray((err, res) => {
              if(err){
                console.log(err);
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
                return;
            }else{
              if(res==null){
                reject(result);
              }
              else{
                console.log("[filt] ayo");
                result.filtedData = res;
                console.log(res);
                resolve(result);
              }
                console.log(res);
              }
              db.close();
            });
        });
    })
    

  }
