const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        trim:true,
    },
    password :{
        type : String,
        required : true,
        trim : true,
    },
    role : {
        type : String,
        enum : ['STUDENT',"ADMIN"],
        required : true,
    },
});

module.exports = mongoose.model("user",UserSchema);