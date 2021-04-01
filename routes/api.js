var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var ExpressValidation = require("./validation");
var User = require("../api/user/userController");
var JwtVerify = require('./jwtVerify');
dotenv.config();


router.post('/register', ExpressValidation.userRegisterValidation(),ExpressValidation.validateError,User.userRegister);
router.post('/login',ExpressValidation.userLoginValidation(),ExpressValidation.validateError, User.userLogin);

router.get('/profile',JwtVerify.isJwtVerify,function(req,res){
  return res.json({
    success: true,
    message: "SuccessFillu",
  });
});


module.exports = router;
