var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = async function findDataByAcc(findData){

    console.log("findData = " + JSON.stringify(findData));

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

            console.log("[succ] connect to mongodb." );
            dbo.collection('test').find({account: findData.account}).toArray((err, res) => {
                if(err){
                    console.log(err);
                    result.status = "連線失敗"
                    result.err = "伺服器錯誤!"
                    reject(result);
                    return;
                }else{
                    if(res == null){
                        reject(result);
                        console.log("[err] no found data" );
                    }
                    else{
                        console.log("=========== resin ========== " );
                        console.log("resin = " + JSON.stringify(res));
                        findData = res;
                        result.loginMember = findData;
                        resolve(result);
                    }            
                }
            });

            resolve(result);
        })
    })
}


