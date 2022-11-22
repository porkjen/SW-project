module.exports = function memberLogin(MongoClient, connectAddr, memberData){

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
                reject(result);
                return;
            }else{
                if(res==null){
                    result.status = "帳密錯誤";
                    reject(result);
                }
                else{
                    result.loginMember = memberData;
                    resolve(result);
                }
                
            }
            })
        })
    })
}