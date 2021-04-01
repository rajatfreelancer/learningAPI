var Common = require("../common");
var Services = require("./services");
var User = require("../../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

exports.userRegister = async function(req, res){
    try 
    {   
        const newuser= new User(req.body);
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync( newuser.password , salt);
        
        await User.findOne({email:newuser.email},function(err,user){
            if(user){
                return res.json(
                    Common.errorResponse(
                    "badRequest",
                    "Email already exits",
                    )
                );
            }
            newuser.password = hash;
            newuser.save((err,doc)=>{
                if(err) {
                    return res.json(
                        Common.errorResponse(
                        "badRequest",
                        "User not save",
                        )
                    );
                }

                return res.send(
                    Common.successResponse("Thanks for registration",'')
                ); 
            });
        });       
    } catch (err) {
        //console.log(err);
        return res.json(
            Common.errorResponse(
            "badRequest",
            "Failed to process request",
            )
        );
    } 
    
};


exports.userLogin = async function(req, res){
    try 
    {   

       
        User.findOne({email:req.body.email}, async function(err,user){

            
            var checkPassword = await bcrypt.compare(req.body.password,user.password);
            //return checkPassword;

           

            if(!checkPassword){
                return res.json(
                    Common.errorResponse(
                    "badRequest",
                    "Password doesn't match",
                    )
                );
            }

            try{
                
                var token =  jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user.username
                  }, process.env.TOKEN_SECRET);

                var result = { 
                    token : token
                };
                    
                return res.send(
                    Common.successResponse("Successfully login",result)
                );

            }catch(err){
                return res.json(
                    Common.errorResponse(
                    "badRequest",
                    "Failed to process request 898",
                    )
                );
            }
        });       
    } catch (err) {
        //console.log(err);
        return res.json(
            Common.errorResponse(
            "badRequest",
            "Failed to process request",
            )
        );
    } 
    
};


module.exports;