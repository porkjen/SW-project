module.exports = function register(MongoClient, connectAddr, memberData){
    let result = {};
    return new Promise((resolve, reject) =>{

        MongoClient.connect(connectAddr, function(err,db){
            if(err){
                console.log("[err] insert");
                console.log(err);
                result.status = "連線失敗"
                result.err = "伺服器錯誤!"
                reject(result);
                return;
            }

            var dbo = db.db('signData');
            
            dbo.collection('userList').insert(memberData, function(err, res){
                if(err){
                    console.log(err);
                    result.status = "連線失敗"
                    result.err = "伺服器錯誤!"
                    reject(result);
                    return;
                }
            })
            console.log("[succ] insert");
            resolve(result);
        })
    })
}