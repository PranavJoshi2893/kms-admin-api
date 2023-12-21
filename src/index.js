'use strict'
require('dotenv').config();

// server config
const express = require('express');
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = express();
app.listen(PORT, HOST, () => {
    console.log(`[ready] http://${HOST}:${PORT}`);
})

//database config
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect(process.env.MONGO_URI)
}
main().then(() => console.log(`[connected] database connected`))
main().catch((err) => console.error(err));


//cors config
const cors = require('cors');
app.use(cors({
    "origin": 'http://192.168.0.129:4200',
    "methods": 'GET,HEAD,PUT,PATCH,POST,DELETE',
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}));

app.use(express.json());

//endpoint connections
const user_route = require('./modules/user/user_route');
app.use('/api/v1',user_route);