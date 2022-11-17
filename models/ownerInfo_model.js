var MongoClient = require('mongodb').MongoClient;

module.exports = function inputOwnerData(ownerData){

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
            
            dbo.collection('userList').updateOne({account:ownerData.account}, {$set:ownerData}, {upsert:true});
            result.ownerMember = ownerData;
            resolve(result);
        })
    })
}


