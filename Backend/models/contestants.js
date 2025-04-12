const mongoose = require('mongoose');
const elections = require('./elections');

const contestantsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    photo : {
        type : String,
        trim : true,
    },
    elections : {
        type : String,
    },
    votes : {
        type : Number,
        default : 0,
    }
});

module.exports = mongoose.model("Contestants",contestantsSchema);