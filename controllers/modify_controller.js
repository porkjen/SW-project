const MongoClient = require('mongodb').MongoClient;
const connectAddr = "mongodb://localhost:27017/signData";

const loginAction = require('../models/login_model');
const insertNewData = require('../models/insertData_model');
const inputDataByAcc = require('../models/updateData_model');
const findDataByQuery = require('../models/findData_model');

/*  global variables, for using the information conviniently.   
    password cannot be recorded in global variables for security. */
var LOCAL_IDENTITY = {  
    account     : null,                                     //帳號
    name        : null,                                     //姓名
    phone       : null,                                     //電話
    email       : null,                                     //email
    gender      : "secret",                                 //性別 (male / female)
    license     : null,                                     //車牌號碼
    helmet      : "no",                                     //可接送地點 <Array>
    location    :  null,                                    //可載客時間 <Array>
    workingTime : null,                                     //是否有安全帽 (yes / no)
    other       : "No other condition or comment.",         //其他說明
    status      : "offline",                                //上線狀態 (online / busy / offline)
    identity    : "unknown"                                 //身分 (owner / passenger)
};

/*  To avoid the data not changed to cover old data.  
    Must be called before call inputDataByAcc !!      */
function updateLocalVar(identityData) { 
    LOCAL_IDENTITY.account     = (identityData.account)     ? identityData.account : LOCAL_IDENTITY.account;    
    LOCAL_IDENTITY.name        = (identityData.name)        ? identityData.name : LOCAL_IDENTITY.name;    
    LOCAL_IDENTITY.phone       = (identityData.phone)       ? identityData.phone : LOCAL_IDENTITY.phone;  
    LOCAL_IDENTITY.email       = (identityData.email)       ? identityData.email : LOCAL_IDENTITY.email;  
    LOCAL_IDENTITY.gender      = (identityData.gender)      ? identityData.gender : LOCAL_IDENTITY.gender;   
    LOCAL_IDENTITY.license     = (identityData.licensePlateNum)     ? identityData.licensePlateNum : LOCAL_IDENTITY.license;
    LOCAL_IDENTITY.helmet      = (identityData.helmet)      ? identityData.helmet : LOCAL_IDENTITY.helmet;
    LOCAL_IDENTITY.location    = (identityData.location)    ? identityData.location : LOCAL_IDENTITY.location;
    LOCAL_IDENTITY.workingTime = (identityData.workingTime) ? identityData.workingTime : LOCAL_IDENTITY.workingTime;
    LOCAL_IDENTITY.other       = (identityData.other)       ? identityData.other : LOCAL_IDENTITY.other;
    LOCAL_IDENTITY.status      = (identityData.status)      ? identityData.status : LOCAL_IDENTITY.status;
    LOCAL_IDENTITY.identity    = (identityData.identity)    ? identityData.identity : LOCAL_IDENTITY.identity;
    console.log("[succ] update local var");
};

module.exports = class member{
    
    postRegister(req, res, next){
    
        LOCAL_IDENTITY.account = req.body.account;
        var registerData = {
            account: req.body.account,
            password: req.body.password,
            email: req.body.email
        };
        
        insertNewData(MongoClient, connectAddr, registerData).then(result =>{
            res.json({
                status: "insert 成功",
                result: result
            })
        },(err) => {
            res.json({
                result: err
            })
        })
    }

    postLogin(req, res, next){
    
        var signInData = {
            account: req.body.account,
            password: req.body.password
        };
        updateLocalVar(signInData);
        
        loginAction(MongoClient, connectAddr, signInData).then(result => {
            res.json({
                status: "登入成功",
                result: result
            })
        },(err) => {
            res.json({
                status: "登入失敗",
                result: err
            })
            alert("帳號或密碼錯誤! ");
        });

        var loginData = {
            account:    signInData.account,
            status:     "online"
        }
        updateLocalVar(data);
        inputDataByAcc(MongoClient, connectAddr, LOCAL_IDENTITY);
    }

    postChangeInfo(req, res, next){
        var changeData = {
            account:            LOCAL_IDENTITY.account,     //帳號
            name:               req.body.name,              //姓名
            phone:              req.body.phone,             //電話
            email:              req.body.email,             //email
            gender:             req.body.gender,            //性別
            licensePlateNum:    req.body.licensePlateNum,   //車牌號碼
            location:           req.body.location,          //可接送地點
            workingTime:        req.body.workingTime,       //可載客時間
            helmet:             req.body.helmet,            //是否有安全帽
            other:              req.body.other,             //其他說明
            status:             req.body.status,            //上線狀態
            identity:           req.body.identity
        };

        updateLocalVar(changeData);
        
        inputDataByAcc(MongoClient, connectAddr, LOCAL_IDENTITY).then(result => {
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

    ListUserData(req, res, next){ // 未完成

        var findDataQuery = {account: LOCAL_IDENTITY.account};
        
        findDataByQuery(MongoClient, connectAddr, findDataQuery).then(res => {
            client.close();
            res.json(result);
        });
        console.log(res);
        updateLocalVar(res);
    }
}