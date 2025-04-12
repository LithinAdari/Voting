const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },
    category : {
        type : String,
        enum : ["PRESIDENT","VICE-PRESIDENT","TREASURER"],
        required : true,
    },
    active : {
        type : Boolean,
        required : true,
        default : true,
    },
    contestants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Contestants",
    }],
    voter : {
        type : String,
    }
});

module.exports = mongoose.model("Elections",electionSchema);