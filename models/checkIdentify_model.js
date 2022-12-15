var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = async function checkIdentify(identifyToCheck){

    let res = {};
    
    return new Promise (resolve => {
    
        MongoClient.connect(connectAddr).then((client, err) => {

            if(err){
                // console.log("[err] fail to connect mongodb.");
                res.json({
                    status : "連線失敗",
                    result : "[err] fail to connect mongodb."
                });
                reject(err);
            }
            // console.log("[succ] succeed to connect mongodb.");
            const dbo = client.db("mydb");

            dbo.collection("test").findOne(identifyToCheck).then((res, err) => {
                if(err){
                    res.json({
                        status : "err",
                        result : "[err] fail to connect collection."
                    });
                    reject(err);
                }
                console.log("[succ] succ to check." );
                resolve(res);
            });
            
        });
    }
  )
}
