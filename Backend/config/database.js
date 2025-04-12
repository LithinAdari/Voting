const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((e) => {
        console.log("DB Connection UnsuccessFul");
        console.error(e);
        process.exit(1);
    });
}

module.exports = dbConnect;