var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = function insertNewData(memberData){
    let result = {};
    return new Promise((resolve, reject) =>{

        MongoClient.connect(connectAddr, function(err,db){
            if(err){
                console.log(err);
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
            }

            var dbo = db.db('mydb');

            dbo.collection('test').insertOne(memberData, function(err, res){

                if(err){
                    console.log("[err] fail to insert a new data." );
                    console.log(err);
                    result.status = "連線失敗"
                    result.err = "伺服器錯誤!"
                    reject(result);
                    return;
                }
                
            })
            result.registerMember = memberData;
            console.log("[succ] succ to insert a new data." );
            resolve(result);
        })
    })
}
