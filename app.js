const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./route/web');
const User = require('./models/user');
const sequelize = require('./utils/connection');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",routes);

(async () => {
    try{
        await sequelize.sync();
    }catch(err){
        console.log(`Somthing went wrong because of : ${err}`);
    }
})()

app.listen(process.env.PORT, process.env.HOST, console.log(`App Url : http://${process.env.HOST}:${process.env.PORT}`));