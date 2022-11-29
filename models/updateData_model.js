var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = function inputDataByAcc(inputData){

    let result = {};
    return new Promise((resolve, reject) =>{
        MongoClient.connect(connectAddr, function(err,db){
            if(err){
                console.log("資料庫連線失敗");
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
                return;
            }

            var dbo = db.db('mydb');
            
            dbo.collection('test').updateOne({account:inputData.account}, {$set:inputData}, {upsert:true});
            resolve(result);
        })
    })
}


