var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = function inputDataByAcc(rateData){

    let result = {};
    return new Promise((resolve, reject) =>{
        MongoClient.connect(url, function(err,db){
            if(err){
                console.log("資料庫連線失敗");
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
                return;
            }

            var dbo = db.db('mydb');
            
            dbo.collection('ownerCollection').updateOne({account:rateData.account}, 
                {$set: {"rateTotal": Number(rateData.rateTotal)+Number(rateData.rate), "rateCount": rateData.rateCount+1} });
            resolve(result);

            dbo.collection('ownerCollection').updateOne({account:rateData.account}, 
                {$push: {comment:rateData.newComment} });
            resolve(result);
        })
    })
}
