var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

module.exports = async function listPassengers(matchedPassengerData){

    console.log(">>>>matchedPassengerData = " + JSON.stringify(matchedPassengerData));
    let res = {};
    
    return new Promise (resolve => {
    
        MongoClient.connect(connectAddr).then((client, err) => {

            if(err){
                console.log("[err] fail to connect mongodb.");
                res.json({
                    status : "連線失敗",
                    result : "伺服器錯誤!"
                });
                reject(err);
            }
            console.log("[succ] succeed to connect mongodb.");
            const dbo = client.db("mydb");

            dbo.collection("test").find(matchedPassengerData).toArray()
            .then((res, err) => {
                if(err){
                    console.log("[err] fail to connect collection.");
                    res.json({
                        status : "連線失敗",
                        result : "伺服器錯誤!"
                    });
                    reject(err);
                }
                if(res == []) {
                    console.log("[warn] no found passenger)." );
                    res.status = "無訂單"
                }
                else {
                    console.log("[succ] succ to find passenger." );
                    console.log(">>>>> order res = "+ JSON.stringify(res));
                    console.log(">>>>> order res[0] = "+ JSON.stringify(res[0]));
                    res.status = "有訂單";
                }
                console.log(res);
                resolve(res);
            });
            
        });
    }
  )
}
