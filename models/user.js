var mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    firstname:{
        type: String,
        required: true,
        maxlength: 100
    },
    lastname:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    deviceToken:{
        type: String
    },
    deviceType:{
        type: String
    }
});

module.exports=mongoose.model('User',userSchema);