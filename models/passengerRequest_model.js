var MongoClient = require('mongodb').MongoClient;

module.exports = function passengerRequest(passengerData){

    let result = {};
    return new Promise((resolve, reject) =>{
        MongoClient.connect("mongodb://localhost:27017/signData", function(err,db){
            if(err){
                console.log(err);
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
                return;
            }

            var dbo = db.db('signData');
            
            dbo.collection('passenger').insert(passengerData, function(err, res){
                if(err){
                    console.log(err);
                    result.status = "連線失敗"
                    result.err = "伺服器錯誤!"
                    reject(result);
                    return;
                }
            })
            result.loginMember = passengerData;
            resolve(result);
        })
    })
}