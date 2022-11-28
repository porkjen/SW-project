var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = async function memberLogin(memberData){

    let result = {};

    return new Promise((resolve, reject) =>{
        MongoClient.connect(connectAddr, function(err,db){
            if(err){
                console.log(err);
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
                return;
            }

            var dbo = db.db('mydb');
            
            dbo.collection('test').findOne(memberData, function(err, res){
            if(err){
                console.log(err);
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(err);
                return;
            }else{
                if(res==null){
                    result.err = "沒有該帳號"
                    resolve(result);
                }
                else{
                    result.loginMember = memberData;
                    result.status = "登入成功"
                    resolve(result);
                }            
            }
            })
        })
    })
}
