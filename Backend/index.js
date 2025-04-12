const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin : "*",
    credentials : true,
}));

PORT =4000;

const dbConnect = require('./config/database');
dbConnect();

const userRouter = require('./routers/user');

app.use("/api/v1",userRouter);



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

app.get('/' , (req,res) => {
    res.send(`<div>Hello</div>`)
})