var MongoClient = require('mongodb').MongoClient;

module.exports = function passengerRequest(passengerData){

    let result = {};
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
            
            dbo.collection('userList').findOne(passengerData.account, function(err, res){
                if(err){
                    console.log("送出要求失敗");
                    result.status = "連線失敗"
                    result.err = "伺服器錯誤!"
                    reject(result);
                    return;
                }
                else {
                    if(res == null) reject(result);
                    else{
                        dbo.collection('passenger').insert(passengerData);
                    }
                }
            })
            result.passengerMember = passengerData;
            resolve(result);
        })
    })
}