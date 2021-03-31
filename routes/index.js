var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var User = require("../models/User");
// get config vars
dotenv.config();

// access config var
console.log(process.env.TOKEN_SECRET);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/api/createNewUser', (req, res) => {
  // ...

  const token = generateAccessToken({ username: req.body.username });
  res.json(token);

  // ...
});


function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}




router.post('/api/register',async (req,res) => {
  // taking a user
  const newuser=new User(req.body);
  
 if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
  
 await User.findOne({email:newuser.email},function(err,user){
      if(user) return res.status(400).json({ auth : false, message :"email exits"});

      newuser.save((err,doc)=>{
          if(err) {console.log(err);
              return res.status(400).json({ success : false});}
          res.status(200).json({
              succes:true,
              user : doc
          });
      });
  });
});

router.post('/api/login',async (req,res) => {
  // taking a user
  const newuser=new User(req.body);
  
// if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
  
 await User.findOne({email:newuser.email},function(err,user){
      if(!user) return res.status(400).json({ auth : false, message :"user not exits"});

      if(newuser.password!=user.password)return res.status(400).json({message: "password not match"});
      
      const token = generateAccessToken({ username: newuser.firstname });
      //res.json(token);
      res.status(200).json({
        succes:true,
        token : token
    });
  });
});


router.get('/api/profile',authenticateToken , async (req,res) => {
  
  res.status(200).json({succes:true})
});


module.exports = router;
