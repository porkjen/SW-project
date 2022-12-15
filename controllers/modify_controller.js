const insertNewData = require('../models/insertData_model');
const inputDataByAcc = require('../models/updateData_model');
const matchOwner = require('../models/matchOwner');
const riderFilter = require('../models/riderFilter_model');
const findData = require('../models/findData_model');
const checkIdentify = require('../models/checkIdentify_model');

// sending email
const credentials = require('../models/credentials')
const from = credentials.gmail.user;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: from,
        pass: credentials.gmail.pass,
    },
    tls: {
        rejectUnauthorized: false
    }
});

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
    takingPlace : null,                                     //乘客上車地點
    takingTime  : null,                                     //搭乘時間
    destination : null,                                     //目的地
    other       : "No other condition or comment.",         //其他說明
    status      : "offline",                                //上線狀態 (online / busy / offline)
    identityO   : null,                                     //身分 (owner / passenger)
    identityP   : null,                                     //身分 (owner / passenger)
    denyReason  : null,                                     //拒絕原因
    remark      : null,                                     //備註
    rateTotal   : 0,                                        //總評分
    rateCount   : 0,                                        //評分數量
    comment     : null,                                     //評論
    findPair    : null                                      //乘客要找的車主姓名 or 車主要找的乘客姓名
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
    LOCAL_IDENTITY.destination = (identityData.destination) ? identityData.destination  : LOCAL_IDENTITY.destination;
    LOCAL_IDENTITY.takingPlace = (identityData.takingPlace)  ? identityData.takingPlace  : LOCAL_IDENTITY.takingPlace;
    LOCAL_IDENTITY.takingTime  = (identityData.takingTime)  ? identityData.takingTime   : LOCAL_IDENTITY.takingTime;
    LOCAL_IDENTITY.other       = (identityData.other)       ? identityData.other        : LOCAL_IDENTITY.other;
    LOCAL_IDENTITY.identityO   = (identityData.identityO)   ? identityData.identityO    : LOCAL_IDENTITY.identityO;
    LOCAL_IDENTITY.identityP   = (identityData.identityP)   ? identityData.identityP    : LOCAL_IDENTITY.identityP;
    LOCAL_IDENTITY.status      = (identityData.status)      ? identityData.status       : LOCAL_IDENTITY.status;
    LOCAL_IDENTITY.findPair    = (identityData.findPair)    ? identityData.findPair     : LOCAL_IDENTITY.findPair;
    LOCAL_IDENTITY.denyReason  = (identityData.denyReason)  ? identityData.denyReason   : LOCAL_IDENTITY.denyReason;
    LOCAL_IDENTITY.rateTotal   = (identityData.rateTl)      ? identityData.eTotal       : LOCAL_IDENTITY.rateTotal;
    LOCAL_IDENTITY.rateCount   = (identityData.rateCount)   ? identityData.rateCoun     : LOCAL_IDENTITY.rateount;
    LOCAL_IDENTITY.comment     = (identityData.comment)     ? identityData.comment      : LOCAL_IDENTITY.commet ;
    LOCAL_IDENTITY.remark      = (identityData.remark)      ? identityData.remark       : LOCAL_IDENTITY.remark;
    console.log("[succ] update local variable successfully." );
};
//clear all lacal identity info (use in log out or no found data)
function clearLocalVar() { 
    LOCAL_IDENTITY.account     = null,                            
    LOCAL_IDENTITY.name        = null,                            
    LOCAL_IDENTITY.phone       = null,                            
    LOCAL_IDENTITY.email       = null,                            
    LOCAL_IDENTITY.gender      = "secret",                        
    LOCAL_IDENTITY.license     = null,                            
    LOCAL_IDENTITY.helmet      = null,                            
    LOCAL_IDENTITY.area        = null,                            
    LOCAL_IDENTITY.workingTime = null, 
    LOCAL_IDENTITY.destination = null,  
    LOCAL_IDENTITY.takingPlace = null, 
    LOCAL_IDENTITY.takingTime  = null,                         
    LOCAL_IDENTITY.other       = "No other condition or comment.",
    LOCAL_IDENTITY.identityO   = null,  
    LOCAL_IDENTITY.identityP   = null,   
    LOCAL_IDENTITY.denyReason  = null,  
    LOCAL_IDENTITY.remark      = null,       
    LOCAL_IDENTITY.rateCount   = 0,   
    LOCAL_IDENTITY.rateTotal   = 0,  
    LOCAL_IDENTITY.comment     = null,                 
    LOCAL_IDENTITY.status      = "offline",                            
    LOCAL_IDENTITY.findPair    = null                             
    console.log("[succ] clear local variable successfully." );
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
        
        findData(signInData).then(result => {

            if(result.status == "succ"){
                console.log("[succ] succ to login." );
                updateLocalVar(result[0]);

                LOCAL_IDENTITY.status = "online";
                inputDataByAcc(LOCAL_IDENTITY);
            }
            else if(result.status == "no found"){
                console.log("[err] fail to login (no found data)." );
                clearLocalVar();
            }

        },(err) => {
            console.log("[err] login err." );
            console.log(err);
        });
    }

    getLogin(req, res, next){
    
        var signInData = {
            account:    LOCAL_IDENTITY.account
        };
        findData(signInData).then(result => {

            if(result.status == "succ"){
                console.log("[succ] succ to response login info." );
            }
            else if(result.status == "no found"){
                console.log("[err] fail to response login info (no found data)." );
            }
            res.json({
                status: result.status,
                result: result
            })

        },(err) => {
            console.log("[err] login err." );
            res.json({
                status: result.status,
                result: err
            })
        });
    }

    postMatchOwner(req, res, next){             //乘客頁面列出車主
    
        //LOCAL_IDENTITY.account = req.body.account;
        var matchData = {
            identityP: LOCAL_IDENTITY.identityP,
            status: LOCAL_IDENTITY.status,
            area: LOCAL_IDENTITY.area
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
            area:               req.body.area,              //可接送地點
            workingTime:        req.body.workingTime,       //可載客時間
            destination:        req.body.destination,       //目的地
            takingPlace:        req.body.takingPlace,       //乘客上車地點
            takingTime:         req.body.takingTime,        //可搭乘時間
            helmet:             req.body.helmet,            //是否有安全帽
            other:              req.body.other,             //其他說明
            status:             req.body.status,            //上線狀態
            denyReason:         req.body.denyReason,        //拒絕原因
            remark:             req.body.remark,            //備註
            identityO:          req.body.identityO,
            identityP:          req.body.identityP
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
        var desData = {
            // account:     "peanut",
            // password:    "peanutPie",
            account:     LOCAL_IDENTITY.account,
            password:    LOCAL_IDENTITY.password,
            destination: req.body.destination
        };
        // updateLocalVar(desData);
        // inputDataByAcc(LOCAL_IDENTITY);
        console.log("destination" + req.body.destination);

        findData(desData).then(result => {
            if(result.status == "succ"){
                console.log("[account]" + result[0].account);
                updateLocalVar(result[0]);
                inputDataByAcc(LOCAL_IDENTITY);
            }
            else if(result.status == "no found"){
                console.log("[err] fail to find." );
                clearLocalVar();
            }
        });
        var filterData = {
            /*name:       req.body.name,*/
            gender:     req.body.gender,
            helmet:     req.body.helmet,
            area:       req.body.area,
            takingPlace:req.body.takingPlace
        }
       
        console.log("[filter] gender: " + filterData.gender);

        riderFilter(filterData).then(result => {
            console.log("[note] this is filter");
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

    postUploadPhoto(req, res, next){        //上傳照片
        upload(req, res, async () => {
            const client = new ImgurClient({
              clientId: process.env.IMGUR_CLIENTID,
              clientSecret: process.env.IMGUR_CLIENT_SECRET,
              refreshToken: process.env.IMGUR_REFRESH_TOKEN,
            });
            const response = await client.upload({
                image: req.files[0].buffer.toString('base64'),
                type: 'base64',
                album: process.env.IMGUR_ALBUM_ID
              });
              res.send({ url: response.data.link });
            })
    }

    postFindPassenger(req, res, next){   //列出車主 mainPage 的乘客資料
        var passengerDataQuery = {
            identityP: "passenger",
            findPair: LOCAL_IDENTITY.name
        };
        findData(passengerDataQuery).then(result =>{
            console.log("[succ] succ to list passengers.");
            res.json({
                status: result.status,
                result: result
            })
        },(err) => {
            res.json({
                result: err
            })
        });
    }

    getCheckIdentify(req, res, next){  
        var findIdentify = {
            account: LOCAL_IDENTITY.account
        };
        checkIdentify(findIdentify).then(result =>{
            console.log("[succ] succ to check identify.");
            res.json({
                result: result
            })
        },(err) => {
            res.json({
                result: err
            })
        });
    }

    postFindOwner(req, res, next){   //乘客送出訂單給車主
        
        updateLocalVar({findPair : req.body.name});
        inputDataByAcc(LOCAL_IDENTITY).then(result => {
            res.json({
                status: "findPair 成功",
                result: result
            })
        },(err) => {
            res.json({
                status: "findPair 失敗",
                result: err
            })
        });

        var myOwner = {
            identityO:   "owner", 
            status:     "online",
            name:       LOCAL_IDENTITY.findPair
        }

        findData(myOwner).then(result =>{

            console.log("[succ] succ to find the owner." );

            var sendData = {
                from:       from,
                to:         result[0].email,
                subject:    '海大共乘網 有您的新消息',
                html:       "<p>叮咚! 有新的訂單囉!</p><br><a href='http://127.0.0.1:3000/mainPage.html'>來去海大共乘網看看~</a>"
            };
            transporter.sendMail(sendData).then(info => {
                console.log("[succ] send mail.");
            }).catch(console.error);

        },(err) => {
            console.log("err: " + err);
        });
    }
}
