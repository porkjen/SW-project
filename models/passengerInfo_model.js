var MongoClient = require('mongodb').MongoClient;

module.exports = function inputPassengerData(passengerData){

    return new Promise((resolve, reject) =>{
        MongoClient.connect("mongodb://localhost:27017/signData", function(err,db){
            if(err){
                console.log("資料庫連線失敗");
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
                return;
            }

            var dbo = db.db('signData');
            var myQuery = {account:passengerData.account};
            
            dbo.collection('userList').updateOne(myQuery, passengerData, function(err, res){
                if(err){
                    console.log("資料庫連線失敗");
                    result.status = "連線失敗"
                    result.err = "伺服器錯誤!"
                    reject(result);
                    return;
                }
                console.log("updated successfully");
            });
            result.passengerMember = passengerData;
            resolve(result);
        })
    })
}


