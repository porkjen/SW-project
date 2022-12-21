var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = async function findOneData(dataToFind, collection){

    let res = {};
    
    return new Promise ((resolve, reject) => {
    
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

            dbo.collection(collection).findOne(dataToFind, function(err, res){
                if(err){
                    console.log("[err][findOne] fail to connect collection.");
                    res.json({
                        result : "[err][findOne] fail to connect collection."
                    });
                    reject(err);
                }
                if(res == null) {
                    console.log("[err][findOne] no found." );
                }
                else {
                    console.log("[succ][findOne] succ to find." );
                }
                resolve(res);
            });
            
        });
    })
}
