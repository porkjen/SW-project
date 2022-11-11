var express = require('express');
var redis = require('redis');
var router = express.Router();
var redisClient = redis.strictRedis();

var MemberModifyMethod = require('../controllers/modify_controller');

MemberModifyMethod = new MemberModifyMethod();
router.post('/register',MemberModifyMethod.postRegister);
router.post('/login',MemberModifyMethod.postLogin);
router.post('/passengerInfo',MemberModifyMethod.postPassenger);


module.exports = router;
