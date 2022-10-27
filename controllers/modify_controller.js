const toRegister = require('../models/register_model');
const loginAction = require('../models/login_model');
const loginAction = require('../models/passengerRequest_model');


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
            account:      req.body.account,
            location:     req.body.location,        //所在地
            destination:  req.body.destination,     //目的地
            requestStatus:false                     // 訂單未被接單，true 表示已被接單
        };

        passengerRequest(passengerData).then(result => {
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