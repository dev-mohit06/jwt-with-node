const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
});

const is_connect = async () => {
    try {
        const returnedValue = await sequelize.authenticate()
    } catch (error) {
        console.log("Connection Failed : " + error);
    }
}

is_connect();

module.exports = sequelize;