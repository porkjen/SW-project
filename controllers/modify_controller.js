const toRegister = require('../models/register_model');
const loginAction = require('../models/login_model');
const inputPassengerData = require('../models/passengerInfo_model');
const inputOwnerData = require('../models/ownerInfo_model');


module.exports = class member{

    postRegister(req, res, next){
    
        var memberData = {
            account: req.body.account,
            password: req.body.password,
            email: req.body.email
        };
        
        toRegister(memberData).then(result =>{

            res.json({
                status: "註冊成功",
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

    postPassenger(req, res, next){
    
        var passengerData = {
            account:    req.body.account,
            name:       req.body.name,
            phone:      req.body.phone,
            gender:     req.body.gender,
            identity:   "passenger"
        };

        inputPassengerData(passengerData).then(result => {
            res.json({
                status: "要求送出成功",
                result: result
            })
        },(err) => {
            res.json({
                status: "要求送出失敗",
                result: err
            })
        })
    }

    postOwner(req, res, next){
    
        var ownerData = {
            account:            req.body.account,
            name:               req.body.name,
            phone:              req.body.phone,
            gender:             req.body.gender,
            licensePlateNum:    req.body.licensePlateNum,   //車牌號碼
            workingTime:        req.body.workingTime,       //可載客時間
            acceptDeparture:    req.body.acceptDeparture,   //可乘車地點
            other:              req.body.other,             //其他說明
            identity:           "owner"
        };

        inputOwnerDataData(ownerData).then(result => {
            res.json({
                status: "要求送出成功",
                result: result
            })
        },(err) => {
            res.json({
                status: "要求送出失敗",
                result: err
            })
        })
    }
}