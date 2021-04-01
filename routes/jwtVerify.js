var jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();




exports.isJwtVerify = function(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null){
    return res.json({
        success: false,
        message: "Token is required.",
      });
  }
    
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          code: 403,
          message: "Failed to authenticate token.",
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
};


module.exports;