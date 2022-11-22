module.exports = function findData(MongoClient, connectAddr, findDataQuery){
    
    try{
        //client = await MongoClient.connect(connectAddr, {useNewUrlParse: ture});
        return new Promise((resolve, reject) =>{
            MongoClient.connect(connectAddr, function(err, client){
                if(err){
                    console.log("[err] cannot connect mongodb.");
                    reject(err);
                }
                var database = client.db('signData');
                var result = database.collection('userList').find(findDataQuery);
                result.toArray().then((value) =>{
                    console.log("[result] = "+ JSON.stringify(value));
                    resolve(value);
                });
            });
        });
    }catch(err){
        console.log("[err] cannot find data!");
        console.log(err);
        return {};

    }finally{
        client.close();
    }
}