const insertNewData = require('../models/insertData_model');
const inputDataByAcc = require('../models/updateData_model');
const matchOwner = require('../models/matchOwner');
const riderFilter = require('../models/riderFilter_model');

var MongoClient = require('mongodb').MongoClient;
var connectAddr = "mongodb+srv://victoria:cody97028@cluster17.mrmgdrw.mongodb.net/mydb?retryWrites=true&w=majority";

/*  global variables, for using the information conviniently.   
    password cannot be recorded in global variables for security. */
var LOCAL_IDENTITY = {  
    account     : null,                                     //帳號
    name        : null,                                     //姓名
    phone       : null,                                     //電話
    email       : null,                                     //email
    gender      : "secret",                                 //性別 (male / female)
    license     : null,                                     //車牌號碼
    helmet      : null,                                     //是否有安全帽 (yes / no)
    area        : null,                                     //可接送地點 <Array>
    workingTime : null,                                     //可載客時間 <Array>
    other       : "No other condition or comment.",         //其他說明
    status      : "offline",                                //上線狀態 (online / busy / offline)
    identity    : "unknown"                                 //身分 (owner / passenger)
};


/*  To avoid the data not changed to cover old data.  
    Must be called before call inputDataByAcc !!      */
function updateLocalVar(identityData) { 
    LOCAL_IDENTITY.account     = (identityData.account)     ? identityData.account      : LOCAL_IDENTITY.account;    
    LOCAL_IDENTITY.name        = (identityData.name)        ? identityData.name         : LOCAL_IDENTITY.name;    
    LOCAL_IDENTITY.phone       = (identityData.phone)       ? identityData.phone        : LOCAL_IDENTITY.phone;  
    LOCAL_IDENTITY.email       = (identityData.email)       ? identityData.email        : LOCAL_IDENTITY.email;  
    LOCAL_IDENTITY.gender      = (identityData.gender)      ? identityData.gender       : LOCAL_IDENTITY.gender;   
    LOCAL_IDENTITY.license     = (identityData.license)     ? identityData.license      : LOCAL_IDENTITY.license;
    LOCAL_IDENTITY.helmet      = (identityData.helmet)      ? identityData.helmet       : LOCAL_IDENTITY.helmet;
    LOCAL_IDENTITY.area        = (identityData.area)        ? identityData.area         : LOCAL_IDENTITY.area;
    LOCAL_IDENTITY.workingTime = (identityData.workingTime) ? identityData.workingTime  : LOCAL_IDENTITY.workingTime;
    LOCAL_IDENTITY.other       = (identityData.other)       ? identityData.other        : LOCAL_IDENTITY.other;
    LOCAL_IDENTITY.status      = (identityData.status)      ? identityData.status       : LOCAL_IDENTITY.status;
    LOCAL_IDENTITY.identity    = (identityData.identity)    ? identityData.identity     : LOCAL_IDENTITY.identity;
    console.log("[succ] update local variable successfully." );
};

module.exports = class member{

    postRegister(req, res, next){
    
        LOCAL_IDENTITY.account = req.body.account;
        var registerData = {
            account: req.body.account,
            password: req.body.password,
            email: req.body.email
        };
        insertNewData(registerData).then(result =>{
            res.json({
                status: "insert 成功",
                result: result
            })
        },(err) => {
            res.json({
                result: err
            })
        })
        updateLocalVar(registerData);
    }

    postLogin(req, res, next){
    
        var signInData = {
            account:    req.body.account,
            password:   req.body.password
        };

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

            dbo.collection('test').find(signInData).toArray((err, res) => {
                if(err){
                    console.log("[err] fail to connect collection." );
                    console.log(err);
                    result.status = "連線失敗";
                    result.err = "伺服器錯誤!";
                    throw err;
                }else{
                    console.log("[succ] succ to connect collection." );
                    if(res[0] == null){
                        console.log("[err] fail to login (no found data)." );
                    }
                    else{
                        console.log("[succ] succ to login." );
                        updateLocalVar(res[0]);
                        LOCAL_IDENTITY.status = "online";
                        inputDataByAcc(LOCAL_IDENTITY);
                    }            
                }
            });
        })
    }

    postMatchOwner(req, res, next){
    
        LOCAL_IDENTITY.account = req.body.account;
        var matchData = {
            identity: req.body.identity,
            status: req.body.status,
            area: req.body.area
        };
        
        matchOwner(matchData).then(result =>{
            res.json({
                status: "match 成功",
                result: result
            })
        },(err) => {
            res.json({
                result: err
            })
        })
    }

    postChangeInfo(req, res, next){

        var changeData = {
            account:            LOCAL_IDENTITY.account,     //帳號
            name:               req.body.name,              //姓名
            phone:              req.body.phone,             //電話
            email:              req.body.email,             //email
            gender:             req.body.gender,            //性別
            license:            req.body.license,           //車牌號碼
            area:               req.body.area,          //可接送地點
            workingTime:        req.body.workingTime,       //可載客時間
            helmet:             req.body.helmet,            //是否有安全帽
            other:              req.body.other,             //其他說明
            status:             req.body.status,            //上線狀態
            identity:           req.body.identity
        };

        updateLocalVar(changeData);
        
        inputDataByAcc(LOCAL_IDENTITY).then(result => {
            res.json({
                status: "change data 成功",
                result: result
            })
        },(err) => {
            res.json({
                status: "change data 失敗",
                result: err
            })
        });
    }

    postRiderFilter(req, res, next){
        var filterData = {
            gender:     req.body.gender,
            helmet:     req.body.helmet
        }
        
        console.log("[filter] gender: " + filterData.gender);

        riderFilter(filterData).then(result => {
            console.log("[note] this is filter")
            res.json({
                status: "filt data 成功",
                result: result
            })
        },(err) => {
            console.log("[fail] fail to filt");
            res.json({
                status: "filt data 失敗",
                result: err
            })
        });
    }
}
