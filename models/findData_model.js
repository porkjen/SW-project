module.exports = function findData(MongoClient, connectAddr, findDataQuery){

    try{
        MongoClient.connect(connectAddr, function(err, client){

            var database = client.db('signData');
            return new Promise((resolve, reject) => {
                database.collection('userList').find(findDataQuery).toArray(function(err, data){
                    
                    if(err) {
                        console.log("[err] read data");
                        reject(err);
                    }
                    else{
                        //console.log(">>> data = " + JSON.stringify(data));
                        resolve(data);
                        return(data);
                    } 
                });
            });
        });
    }
    catch(e) { 
        console.log("getData 失敗");
        console.log(e);
        next(e);
    };
}