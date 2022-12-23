var express = require('express');
var router = express.Router();

var MemberModifyMethod = require('../controllers/modify_controller');

MemberModifyMethod = new MemberModifyMethod();
router.post('/register', MemberModifyMethod.postRegister);              //註冊
router.post('/login', MemberModifyMethod.postLogin);                    //登入
router.post('/logout', MemberModifyMethod.postLogout);                  //登出
router.post('/passengerInfo', MemberModifyMethod.postChangeInfo);       //新增乘客資料
router.post('/ownerInfo', MemberModifyMethod.postChangeInfo);           //新增車主資料
router.post('/changeOwnerBasic', MemberModifyMethod.postChangeInfo);    //更改車主個人資料
router.post('/changeOwnerTime', MemberModifyMethod.postChangeInfo);     //更改車主載客時間
router.post('/changeOwnerLoc', MemberModifyMethod.postChangeInfo);      //更改車主載客地點
router.post('/changePassengerInfo', MemberModifyMethod.postChangeInfo); //更改乘客個人資料
router.post('/identityInfo', MemberModifyMethod.postChangeInfo);        //更改身分
router.post('/riderFilter', MemberModifyMethod.postRiderFilter);        //乘客篩選車主條件
router.post('/sendOrderToOwner', MemberModifyMethod.postFindOwner);     //乘客送訂單給車主
router.post('/acceptOrder', MemberModifyMethod.postAcceptOrder);        //車主回覆訂單給乘客
router.post ('/listPassenger', MemberModifyMethod.postFindPassenger);   //車主列出所有訂單
router.get ('/matchOwner', MemberModifyMethod.postMatchOwner);          //乘客頁面列出車主
router.post ('/showIdentify', MemberModifyMethod.getCheckIdentify);     //確認使用者的身分
router.post('/rate', MemberModifyMethod.postRate);                      //新增評分
router.post('/uploadPhoto', MemberModifyMethod.postUploadPhoto);     

module.exports = router;
