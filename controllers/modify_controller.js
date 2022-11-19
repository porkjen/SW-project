const insertNewData = require('../models/register_model');
const loginAction = require('../models/login_model');
const inputDataByAcc = require('../models/inputData_model');
const findDataByCondition = require('../models/findDataByCondition_model');

var LOCAL_IDENTITY = {
    account : null, 
    name : null, 
    phone : null, 
    gender : "unknown", 
    license : null, 
    helmet : "no", 
    location :  null, 
    workingTime : null, 
    other : "No other condition or comment.", 
    status : "offline", 
    identity : null
};


/* To avoid the data not changed to cover old data.  
    Must be called before call inputDataByAcc !!      */
function updateLocalVar(identityData) { 
    LOCAL_IDENTITY.account     = (identityData.account)     ? identityData.account : LOCAL_IDENTITY.account;    
    LOCAL_IDENTITY.name        = (identityData.name)        ? identityData.name : LOCAL_IDENTITY.name;    
    LOCAL_IDENTITY.phone       = (identityData.phone)       ? identityData.phone : LOCAL_IDENTITY.phone;  
    LOCAL_IDENTITY.gender      = (identityData.gender)      ? identityData.gender : LOCAL_IDENTITY.gender;   
    LOCAL_IDENTITY.license     = (identityData.licensePlateNum)     ? identityData.licensePlateNum : LOCAL_IDENTITY.license;
    LOCAL_IDENTITY.helmet      = (identityData.helmet)      ? identityData.helmet : LOCAL_IDENTITY.helmet;
    LOCAL_IDENTITY.location    = (identityData.location)    ? identityData.location : LOCAL_IDENTITY.location;
    LOCAL_IDENTITY.workingTime = (identityData.workingTime) ? identityData.workingTime : LOCAL_IDENTITY.workingTime;
    LOCAL_IDENTITY.other       = (identityData.other)       ? identityData.other : LOCAL_IDENTITY.other;
    LOCAL_IDENTITY.status      = (identityData.status)      ? identityData.status : LOCAL_IDENTITY.status;
    LOCAL_IDENTITY.identity    = (identityData.identity)    ? identityData.identity : LOCAL_IDENTITY.identity;;
};

module.exports = class member{
    
    postRegister(req, res, next){
    
        LOCAL_IDENTITY.account = req.body.account;
        var memberData = {
            account: req.body.account,
            password: req.body.password,
            email: req.body.email
        };
        
        insertNewData(memberData).then(result =>{
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
    
        var memberData = {
            account: req.body.account,
            password: req.body.password
        };
        LOCAL_IDENTITY.account = memberData.account;

        loginAction(memberData).then(result => {
            res.json({
                status: "登入成功",
                result: result
            })
        },(err) => {
            res.json({
                status: "登入失敗",
                result: err
            })
        })
    }

    postChangeInfo(req, res, next){

        var changeOwnerData = {
            account:            LOCAL_IDENTITY.account,
            name:               req.body.name,
            phone:              req.body.phone,
            gender:             req.body.gender,
            licensePlateNum:    req.body.licensePlateNum,   //車牌號碼
            location:           req.body.location,          //可接送地點
            workingTime:        req.body.workingTime,       //可載客時間
            helmet:             req.body.helmet,            //是否有安全帽
            other:              req.body.other,             //其他說明
            status:             "online",                   //上線狀態
            identity:           req.body.identity
        };

        updateLocalVar(changeOwnerData);
        
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
}