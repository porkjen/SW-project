var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = async function findData(dataToFind){

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

            dbo.collection("test").find(dataToFind).toArray()
            .then((res, err) => {
                if(err){
                    // console.log("[err] fail to connect collection.");
                    res.json({
                        status : "err",
                        result : "[err] fail to connect collection."
                    });
                    reject(err);
                }
                if(res.length == 0) {
                    console.log("[err] no found." );
                    res.status = "no found"
                }
                else {
                    console.log("[succ] succ to find." );
                    res.status = "succ";
                }
                resolve(res);
            });
            
        });
    }
  )
}
